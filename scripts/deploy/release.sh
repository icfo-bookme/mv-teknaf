#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

base=$1
app=$2
port=$3
release_id=$4
staging=$5

# Noninteractive SSH does not automatically load an NVM installation.
if [[ -s "$HOME/.nvm/nvm.sh" ]]; then
  source "$HOME/.nvm/nvm.sh"
fi
for command in node npm pm2 curl flock; do
  command -v "$command" >/dev/null || { echo "Install $command on the VPS first. See docs/deployment.md."; exit 1; }
done
# Keep a compatible runtime scoped to this app, without changing system Node.
mkdir -p "$base/.runtime"
if [[ -x "$base/.runtime/node_modules/node/bin/node" ]]; then
  export PATH="$base/.runtime/node_modules/node/bin:$PATH"
fi
if ! node -e 'const [major, minor] = process.versions.node.split(".").map(Number); process.exit(major > 22 || (major === 22 && minor >= 12) ? 0 : 1)'; then
  echo 'Installing app-local Node.js 22 (system Node is unchanged)...'
  npm install --prefix "$base/.runtime" --no-save --no-package-lock --no-audit --no-fund node@22
  export PATH="$base/.runtime/node_modules/node/bin:$PATH"
fi
node --version

mkdir -p "$base/releases"
exec 9>"$base/.deploy.lock"
flock -w 120 9 || { echo 'Another deployment is running.'; exit 1; }
release="$base/releases/$release_id"
[[ ! -e "$release" ]] || { echo 'Release already exists'; exit 1; }
mkdir "$release"
tar -xzf "$staging/source.tgz" -C "$release"
# Reuse configuration already on the VPS; it is never uploaded from GitHub.
env_file="$base/.env.production"
if [[ ! -f "$env_file" ]]; then
  echo "Create $base/.env.production on the VPS once using your production app configuration."
  exit 1
fi
install -m 600 "$env_file" "$release/.env.production"
cd "$release"

# A failed build never changes the running application.
npm ci --no-audit --no-fund
printf '%s' "$release_id" > public/deploy-version.txt
npm run build

export DEPLOY_APP_NAME="$app" DEPLOY_APP_PORT="$port"
node <<'NODE'
const fs = require('fs');
fs.writeFileSync('ecosystem.config.cjs', 'module.exports = ' + JSON.stringify({
  apps: [{
    name: process.env.DEPLOY_APP_NAME,
    cwd: process.cwd(),
    script: './node_modules/next/dist/bin/next',
    interpreter: process.execPath,
    args: ['start', '--hostname', '127.0.0.1', '--port', process.env.DEPLOY_APP_PORT],
    instances: 1,
    exec_mode: 'fork',
    autorestart: true,
    env: { NODE_ENV: 'production' },
    kill_timeout: 10000,
  }],
}, null, 2) + ';\n');
NODE

previous=$(readlink -f "$base/current" || true)
rollback() {
  echo 'New release failed to start. Restoring the previous release if available.'
  if [[ -n "$previous" && -f "$previous/ecosystem.config.cjs" ]]; then
    pm2 startOrReload "$previous/ecosystem.config.cjs" --update-env
    pm2 save
  else
    pm2 delete "$app" || true
  fi
}

if ! pm2 startOrReload "$release/ecosystem.config.cjs" --update-env; then
  rollback
  exit 1
fi

# Verify the new process serves HTTP. This does not run the project's tests.
healthy=false
for attempt in $(seq 1 30); do
  if [[ "$(curl --fail --silent --max-time 5 "http://127.0.0.1:$port/deploy-version.txt" || true)" == "$release_id" ]]; then
    healthy=true
    break
  fi
  sleep 2
done
if [[ "$healthy" != true ]]; then
  rollback
  exit 1
fi
ln -s "$release" "$base/current.next.$release_id"
mv -Tf "$base/current.next" "$base/current"
pm2 save
echo "Deployed release $release_id on port $port."
