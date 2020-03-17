import { RouterOptions, RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [];

// Import every module's `routes/*.ts` dynamically...
const req = require.context('../modules/', true, /\/routes\/.+\.ts$/);

for (const path of req.keys()) {
  routes.push(...req(path).default);
}

const config: RouterOptions = {
  mode: 'history',
  routes
};

export default config;
