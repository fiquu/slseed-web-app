/**
 * Theme routes module.
 *
 * @module theme/routes
 */

import { RouteConfig } from 'vue-router';

type ThemeIndexView = Promise<typeof import('../views/index.vue')>;

/* eslint-disable capitalized-comments */

const routes: RouteConfig[] = [
  {
    component: (): ThemeIndexView => import(
      /* webpackChunkName: "theme-index" */
      '../views/index.vue'
    ),
    path: '/theme',
    name: 'theme'
  }
];

export default routes;
