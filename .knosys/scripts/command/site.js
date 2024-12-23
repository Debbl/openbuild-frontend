const { execSync } = require('child_process');

const { resolveRootPath } = require('../helper');

module.exports = {
  execute: (subCmd = 'dev') => {
    const cmds = ['astro --root .knosys/sites/default'];

    if (subCmd) {
      cmds.push(subCmd);
    }

    execSync(cmds.join(' '), { stdio: 'inherit', cwd: resolveRootPath() });
  },
};
