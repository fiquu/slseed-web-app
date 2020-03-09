/**
 * Dashboard routes module.
 *
 * @module dashboard/routes
 */

import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    component: () => import('../components/index.vue'),
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      requiresAuth: true
    }
  }
];

export default routes;
