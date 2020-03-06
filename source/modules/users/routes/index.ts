/**
 * Users routes module.
 *
 * @module users/routes
 */

import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    component: () => import('../components/sign-in.vue'),
    name: 'users-sign-in',
    path: '/users/sign-in'
  },
  {
    component: () => import('../components/index.vue'),
    name: 'users-index',
    path: '/users'
  },
  {
    component: () => import('../components/password.vue'),
    name: 'users-password',
    path: '/users/password'
  }
];

export default routes;
