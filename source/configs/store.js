/**
 * Routes module.
 *
 * @module routes
 */

import is from 'fi-is';

const MOD_REGEX = /^.\/(.+)\/store\/(.+)\.js$/;

export const modules = {};

/* Import every module's `store/index.js` dynamically */
const req = require.context('../modules/', true, /\/store\/.+\.js$/);

for (let path of req.keys()) {
  const name = path.replace(MOD_REGEX, '$1');
  const prop = path.replace(MOD_REGEX, '$2');

  if (is.empty(modules[name])) {
    modules[name] = {
      namespaced: true
    };
  }

  modules[name][prop] = req(path).default;
}

export default {
  modules
};
