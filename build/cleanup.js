/**
 * Cleanup build module.
 *
 * @module build/cleanup
 */

const path = require('path');
const rm = require('rimraf');
const ora = require('ora');

const config = require('../config');

module.exports = () => {
  const spinner = ora(`Cleaning up ${config.assetsRoot}...`).start();

  return new Promise((resolve, reject) =>
    rm(config.assetsRoot, err => {
      if (err) {
        spinner.fail('Cleanup failed!');

        reject(err);

        return;
      }

      spinner.succeed('Cleanup complete.');

      resolve();
    })
  );
};
