const { existsSync } = require('fs');
const { join } = require('path');
const appNode = join(__dirname, '.runtime/node_modules/node/bin/node');

module.exports = {
  apps: [{
    name: 'mvteknaf',
    cwd: __dirname,
    script: './node_modules/next/dist/bin/next',
    interpreter: existsSync(appNode) ? appNode : process.execPath,
    args: ['start', '--hostname', '127.0.0.1', '--port', '3000'],
    instances: 1,
    exec_mode: 'fork',
    autorestart: true,
    env: { NODE_ENV: 'production' },
    kill_timeout: 10000,
  }],
};
