/**
 * Dashboard routes module.
 *
 * @module dashboard/routes
 */

import { RouteConfig } from 'vue-router';

type DashboardComponent = Promise<typeof import('../components/index.vue')>;

const routes: RouteConfig[] = [
  {
    component: (): DashboardComponent => import('../components/index.vue'),
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      requiresAuth: true
    }
  }
];

export default routes;
