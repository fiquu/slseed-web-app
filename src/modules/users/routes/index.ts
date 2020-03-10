/**
 * Users routes module.
 *
 * @module users/routes
 */

import { RouteConfig } from 'vue-router';

type UsersPasswordComponent = Promise<typeof import('../components/password/index.vue')>;
type UsersSignInComponent = Promise<typeof import('../components/sign-in/index.vue')>;
type UsersIndexComponent = Promise<typeof import('../components/index.vue')>;

const routes: RouteConfig[] = [
  {
    component: (): UsersSignInComponent => import('../components/sign-in/index.vue'),
    name: 'users-sign-in',
    path: '/users/sign-in'
  },
  {
    component: (): UsersIndexComponent => import('../components/index.vue'),
    name: 'users-index',
    path: '/users'
  },
  {
    component: (): UsersPasswordComponent => import('../components/password/index.vue'),
    name: 'users-password',
    path: '/users/password'
  }
];

export default routes;
