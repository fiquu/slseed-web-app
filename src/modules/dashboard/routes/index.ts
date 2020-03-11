/**
 * Dashboard routes module.
 *
 * @module dashboard/routes
 */

import { RouteConfig } from 'vue-router';

type DashboardView = Promise<typeof import('../views/index.vue')>;

/* eslint-disable capitalized-comments */

const routes: RouteConfig[] = [
  {
    component: (): DashboardView => import(
      /* webpackChunkName: "dashboard" */
      '../views/index.vue'
    ),
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      requiresAuth: true
    }
  }
];

export default routes;
