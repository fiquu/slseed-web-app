/**
 * Check versions build module.
 *
 * @module build/check-versions
 */

const child = require('child_process');
const semver = require('semver');
const chalk = require('chalk');
const ora = require('ora');

const spinner = ora('Checking dependencies versions...').start();

const package = require('../package.json');

const requirements = [
  {
    current: semver.clean(process.version),
    requires: package.engines.node,
    name: 'node'
  },
  {
    requires: package.engines.npm,
    name: 'npm',
    current: child
      .execSync('npm --version')
      .toString()
      .trim()
  }
];

module.exports = () =>
  new Promise((resolve, reject) => {
    const messages = [];

    requirements.forEach(mod => {
      if (!semver.satisfies(mod.current, mod.requires)) {
        messages.push(`${mod.name}: ${chalk.red(mod.current)} should be ${chalk.green(mod.requires)}`);
      }
    });

    if (messages.length < 1) {
      spinner.succeed('Dependencies versions are ok!');
      resolve();
      return;
    }

    spinner.warn('You must update following modules:');

    messages.forEach(warning => spinner.info(warning));

    spinner.fail('Please fix dependencies version mismatches.');

    reject();
  });
