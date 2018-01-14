/**
 * Build main module.
 *
 * @module build/index
 */

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const webpack = require('webpack');
const path = require('path');
const rm = require('rimraf');
const ora = require('ora');

const versions = require('./check-versions');
const ssm = require('./ssm');

const webpackConfig = require('./webpack.prod.conf');
const config = require('../config');

const spinner = ora(`Building for [${process.env.NODE_ENV}]...`);

// Check dependencies versions
versions()
  // Load parameters
  .then(() => ssm())

  // Cleanup output dir
  .then(() => {
    spinner.start();

    return new Promise((resolve, reject) =>
      rm(path.join(config.assetsRoot, config.assetsSubDirectory), err => {
        if (err) {
          reject(err);
          return;
        }

        resolve();
      })
    );
  })

  // Start build process
  .then(() => {
    // Assign env vars to config env stringified.
    Object.keys(process.env).forEach(key => {
      config.env[key] = JSON.stringify(process.env[key]);
    });

    return new Promise((resolve, reject) =>
      webpack(webpackConfig, (err, stats) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(stats);
      })
    );
  })

  // Build complete
  .then(stats => {
    process.stdout.write(
      `${stats.toString({
        chunkModules: false,
        children: false,
        modules: false,
        chunks: false,
        colors: true
      })}`
    );

    spinner.succeed('Build complete!');

    spinner.info("Built files are meant to be served over an HTTP server. Opening index.html over file:// won't work.");
  })

  // Build error
  .catch(err => {
    spinner.fail('Build failed!');

    if (err && err.message) {
      spinner.fail(err.message);
      console.error(err);
    }

    process.exit();
  });
