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
node -e 'if (Number(process.versions.node.split(".")[0]) < 22) { console.error("Node.js 22 or newer is required"); process.exit(1); }'

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
