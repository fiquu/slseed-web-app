/**
 * Configure build module.
 *
 * @module build/configure
 */

const merge = require('webpack-merge');

const config = require('../config');

module.exports = () => {
  const stage = require(`../config/${process.env.NODE_ENV}`); // Per stage config
  const env = {};

  // Assign process env vars to config env as stringified values for replacement.
  if (process.env) {
    Object.keys(process.env).forEach(key => {
      env[key] = JSON.stringify(process.env[key]);
    });
  }

  // Stringify stage env values for replacement.
  if (stage.env) {
    Object.keys(stage.env).forEach(key => {
      env[key] = JSON.stringify(stage.env[key]);
    });
  }

  // Merge and assign stage values to config
  Object.assign(config, merge(config, stage, { env }));
};
