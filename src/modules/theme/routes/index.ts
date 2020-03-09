/**
 * Theme routes module.
 *
 * @module theme/routes
 */

import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    component: () => import('../components/index.vue'),
    path: '/theme',
    name: 'theme'
  }
];

export default routes;
