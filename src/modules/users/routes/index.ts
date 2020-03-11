/**
 * Users routes module.
 *
 * @module users/routes
 */

import { RouteConfig } from 'vue-router';

type UsersForgotPasswordView = Promise<typeof import('../views/forgot-password.vue')>;
type UsersSignInView = Promise<typeof import('../views/sign-in.vue')>;
type UsersIndexView = Promise<typeof import('../views/index.vue')>;

/* eslint-disable capitalized-comments */

const routes: RouteConfig[] = [
  {
    component: (): UsersSignInView => import(
      /* webpackChunkName: "users-sign-in" */
      '../views/sign-in.vue'
    ),
    name: 'users-sign-in',
    path: '/users/sign-in'
  },
  {
    component: (): UsersIndexView => import(
      /* webpackChunkName: "users-index" */
      '../views/index.vue'
    ),
    name: 'users-index',
    path: '/users'
  },
  {
    component: (): UsersForgotPasswordView => import(
      /* webpackChunkName: "users-forgot-password" */
      '../views/forgot-password.vue'
    ),
    name: 'users-forgot-password',
    path: '/users/forgot-password'
  }
];

export default routes;
