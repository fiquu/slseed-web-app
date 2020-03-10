/**
 * Theme routes module.
 *
 * @module theme/routes
 */

import { RouteConfig } from 'vue-router';

type ThemeComponent = Promise<typeof import('../components/index.vue')>;

const routes: RouteConfig[] = [
  {
    component: (): ThemeComponent => import('../components/index.vue'),
    path: '/theme',
    name: 'theme'
  }
];

export default routes;
