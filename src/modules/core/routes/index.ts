/**
 * Core routes module.
 *
 * @module core/routes
 */

import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    redirect: '/dashboard',
    name: 'index',
    path: '/'
  },
  {
    component: () => import('../components/not-found.vue'),
    name: 'not-found',
    path: '*'
  }
];

export default routes;
