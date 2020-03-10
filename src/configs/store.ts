/**
 * Routes module.
 *
 * @module routes
 */

const MOD_REGEX = /^.\/(.+)\/store\/(.+)\.js$/;
const modules: any = {};

/* Import every module's `store/index.js` dynamically */
const req = require.context('../modules/', true, /\/store\/.+\.ts$/);

for (const path of req.keys()) {
  const name = path.replace(MOD_REGEX, '$1');
  const prop = path.replace(MOD_REGEX, '$2');

  if (!modules[String(name)]) {
    modules[String(name)] = {
      namespaced: true
    };
  }

  modules[String(name)][String(prop)] = req(path).default;
}

export default {
  modules
};
