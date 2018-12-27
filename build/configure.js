/**
 * Configure build module.
 *
 * @module build/configure
 */

const merge = require('webpack-merge');

const pkg = require('../package.json');
const config = require('../config');
const ora = require('ora');

module.exports = () => {
  const spinner = ora('Configuring...').start();

  const stage = require(`../config/${process.env.NODE_ENV}`); // Per stage config
  const obj = {
    app: {},
    env: {}
  };

  // Stringify config env vars.
  if (config.env) {
    for (let key of Object.keys(config.env)) {
      obj.env[key] = JSON.stringify(config.env[key]);
    }
  }

  // Assign process env vars to config env as stringified values for replacement.
  if (process.env) {
    for (let key of Object.keys(process.env)) {
      obj.env[key] = JSON.stringify(process.env[key]);
    }
  }

  // Stringify stage env values for replacement.
  if (stage.env) {
    for (let key of Object.keys(stage.env)) {
      obj.env[key] = JSON.stringify(stage.env[key]);
    }
  }

  // Stringify package app values
  if (pkg.app) {
    for (let key of Object.keys(pkg.app)) {
      obj.app[key] = JSON.stringify(pkg.app[key]);
    }
  }

  // Merge and assign stage values to config
  Object.assign(config, merge(config, stage, obj));

  spinner.succeed('Configuration complete.');
};
