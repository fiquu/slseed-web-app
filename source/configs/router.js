/**
 * Router config module.
 *
 * @module configs/router
 */

const routes = [];

/* Import every module's `routes/index.js` dynamically */
const req = require.context('../modules/', true, /\/routes\/.+\.js$/);

for (let path of req.keys()) {
  routes.push(...req(path).default);
}

export default {
  mode: 'history',
  routes
};
