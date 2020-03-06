/**
 * Router config module.
 *
 * @module configs/router
 */

import { RouterOptions, RouteConfig } from "vue-router";

const routes: RouteConfig[] = [];

// Import every module's `routes/index.js` dynamically...
const req = require.context('../modules/', true, /\/routes\/.+\.js$/);

for (let path of req.keys()) {
  routes.push(...req(path).default);
}

const config: RouterOptions = {
  mode: 'history',
  routes
}

export default config;
