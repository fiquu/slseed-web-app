require('./check-versions')();

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const webpack = require('webpack');
const chalk = require('chalk');
const rm = require('rimraf');
const path = require('path');
const ora = require('ora');

const webpackConfig = require('./webpack.prod.conf');
const config = require('../config');
const env = require('./env');

const spinner = ora(`building for [${process.env.NODE_ENV}]...`);

function onWebpackDone(err, stats) {
  spinner.stop();

  if (err) {
    throw err;
  }

  process.stdout.write(
    `${stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    })}\n\n`
  );

  console.log(chalk.cyan('Build complete.\n'));

  console.log(
    chalk.yellow(
      "Tip: built files are meant to be served over an HTTP server.\n  Opening index.html over file:// won't work.\n"
    )
  );
}

function onRmDone(err) {
  if (err) {
    throw err;
  }

  env.then(values => { // Fetch SSM parameters and assign
    spinner.start();

    Object.assign(config.build.env, values);

    webpack(webpackConfig, onWebpackDone);
  });
}

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), onRmDone);
