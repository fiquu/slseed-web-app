/**
 * Cleanup build module.
 *
 * @module build/cleanup
 */

const path = require('path');
const rm = require('rimraf');
const ora = require('ora');

const config = require('../config');

const outputDir = path.join(config.assetsRoot, config.assetsSubDirectory);

module.exports = () => {
  const spinner = ora(`Cleaning up ${outputDir}...`).start();

  return new Promise((resolve, reject) =>
    rm(outputDir, err => {
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
