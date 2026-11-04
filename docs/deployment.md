# Hostinger VPS auto deployment

Push to `main` → upload source → `npm ci` → `npm run build` → PM2 restart.
No tests or lint run. GitHub Actions also offers a manual **Run workflow** button.

## GitHub Secrets — only three

Repository → Settings → Secrets and variables → Actions → New repository secret:

| Secret | Value |
| --- | --- |
| `VPS_HOST` | Server IP address, without `https://` |
| `VPS_USER` | Server SSH username |
| `VPS_PASSWORD` | That user's SSH password |

No fingerprint, app-env secret or repository deploy key is required. SSH accepts the host key on the first connection in each workflow run.

## One-time VPS setup

The VPS needs a working Node.js/npm installation, PM2, curl, tar and flock. If Node is below 22.12, deployment automatically installs Node 22 into `/var/www/mv-teknaf/.runtime` for this app only. Global Node is unchanged; PM2 uses the selected runtime explicitly. Use the same SSH user for PM2 and deployment, with write access to `/var/www/mv-teknaf`.

Keep your production app configuration on the VPS at:

```text
/var/www/mv-teknaf/.env.production
```

Use the same values as your local app, with `NEXT_PUBLIC_SITE_URL=https://mvteknaf.com.bd`. This file is preserved and copied into each new release before building. Do not commit it to Git. Deployment always uses `.env.production`; there are no other environment-file fallbacks.

DNS, your Nginx/reverse-proxy configuration and HTTPS remain server setup. Proxy the domain to `http://127.0.0.1:3000`.

Enable PM2 startup after reboot once with `pm2 startup`, follow the command it prints, then deploy; deployment runs `pm2 save` automatically.

## Defaults

- SSH port: `22`
- App port: `3000`
- App name in PM2: `mvteknaf`
- Deployment path: `/var/www/mv-teknaf`

These already work without any GitHub variables. Only if your server uses different settings, optional Actions Variables `VPS_SSH_PORT`, `APP_PORT`, `APP_NAME` and `VPS_DEPLOY_PATH` can override them. If the site already runs under PM2, use the same process name and user; another process must not occupy the app port.

New versions build under `releases/` before the live process changes. Build failure leaves the running version alone. Startup failure restores the previous successful release when available. A successful release updates `current`; PM2 fork restart can cause a brief interruption. Old releases are retained; clean up obsolete releases as needed while keeping the current and previous working versions.

Commit the deployment files and push to `main` to trigger deployment. No live deployment has been performed from this local workspace.
