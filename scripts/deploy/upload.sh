#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

: "${VPS_HOST:?Add VPS_HOST to GitHub Actions secrets}"
: "${VPS_USER:?Add VPS_USER to GitHub Actions secrets}"
: "${VPS_PASSWORD:?Add VPS_PASSWORD to GitHub Actions secrets}"

[[ "$VPS_HOST" =~ ^[a-zA-Z0-9.:-]+$ ]] || { echo 'Invalid VPS_HOST'; exit 1; }
[[ "$VPS_USER" =~ ^[a-zA-Z_][a-zA-Z0-9_-]*$ ]] || { echo 'Invalid VPS_USER'; exit 1; }
[[ "$VPS_SSH_PORT" =~ ^[0-9]+$ ]] || exit 1
[[ "$APP_PORT" =~ ^[0-9]+$ ]] || exit 1
[[ "$APP_NAME" =~ ^[a-zA-Z0-9_-]+$ ]] || exit 1
[[ "$VPS_DEPLOY_PATH" =~ ^/[a-zA-Z0-9/_-]+$ && "$VPS_DEPLOY_PATH" != / ]] || exit 1
[[ "/$VPS_DEPLOY_PATH/" != *'/../'* ]] || exit 1

work=$(mktemp -d)
staging=''
export SSHPASS="$VPS_PASSWORD"
unset VPS_PASSWORD

cleanup() {
  if [[ "$staging" =~ ^/tmp/mvteknaf-deploy\.[a-zA-Z0-9]+$ ]]; then
    sshpass -e ssh "${ssh_options[@]}" "$VPS_USER@$VPS_HOST" "rm -f -- '$staging/source.tgz' '$staging/release.sh'; rmdir -- '$staging'" || true
  fi
  rm -f -- "$work/known_hosts" "$work/source.tgz"
  rmdir -- "$work" || true
}
trap cleanup EXIT

# Accept the server host key on first connection; no fingerprint secret is required.
ssh_options=(-p "$VPS_SSH_PORT" -o StrictHostKeyChecking=accept-new -o "UserKnownHostsFile=$work/known_hosts" -o ConnectTimeout=20 -o ServerAliveInterval=30)
scp_options=(-P "$VPS_SSH_PORT" -o StrictHostKeyChecking=accept-new -o "UserKnownHostsFile=$work/known_hosts" -o ConnectTimeout=20)

tar --exclude='./.git' --exclude='./node_modules' --exclude='./.next' \
  --exclude='./.env*' --exclude='./docs/previews' --exclude='./tmp' \
  --exclude='*.log' -czf "$work/source.tgz" .
staging=$(sshpass -e ssh "${ssh_options[@]}" "$VPS_USER@$VPS_HOST" 'umask 077; mktemp -d /tmp/mvteknaf-deploy.XXXXXXXX')
[[ "$staging" =~ ^/tmp/mvteknaf-deploy\.[a-zA-Z0-9]+$ ]] || { echo 'Invalid remote staging path'; exit 1; }
sshpass -e scp "${scp_options[@]}" "$work/source.tgz" scripts/deploy/release.sh "$VPS_USER@$VPS_HOST:$staging/"
sshpass -e ssh "${ssh_options[@]}" "$VPS_USER@$VPS_HOST" \
  "bash '$staging/release.sh' '$VPS_DEPLOY_PATH' '$APP_NAME' '$APP_PORT' '$GITHUB_SHA-$GITHUB_RUN_ID-$GITHUB_RUN_ATTEMPT' '$staging'"
