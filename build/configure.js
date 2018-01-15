/**
 * Configure build module.
 *
 * @module build/configure
 */

const merge = require('webpack-merge');

const slseed = require('../slseed.json');
const config = require('../config');

module.exports = () => {
  const stage = require(`../config/${process.env.NODE_ENV}`); // Per stage config
  const obj = {
    slseed: {},
    env: {}
  };

  // Stringify config env vars.
  if (config.env) {
    Object.keys(config.env).forEach(key => {
      obj.env[key] = JSON.stringify(config.env[key]);
    });
  }

  // Assign process env vars to config env as stringified values for replacement.
  if (process.env) {
    Object.keys(process.env).forEach(key => {
      obj.env[key] = JSON.stringify(process.env[key]);
    });
  }

  // Stringify stage env values for replacement.
  if (stage.env) {
    Object.keys(stage.env).forEach(key => {
      obj.env[key] = JSON.stringify(stage.env[key]);
    });
  }

  // Stringify Slseed values
  Object.keys(slseed).forEach(key => {
    obj.slseed[key] = JSON.stringify(slseed[key]);
  });

  // Merge and assign stage values to config
  Object.assign(config, merge(config, stage, obj));
};
