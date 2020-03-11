/**
 * Core routes module.
 *
 * @module core/routes
 */

import { RouteConfig } from 'vue-router';

type NotFoundView = Promise<typeof import('../views/not-found.vue')>;

/* eslint-disable capitalized-comments */

const routes: RouteConfig[] = [
  {
    redirect: '/dashboard',
    name: 'index',
    path: '/'
  },
  {
    component: (): NotFoundView => import(
      /* webpackChunkName: "not-found" */
      '../views/not-found.vue'
    ),
    name: 'not-found',
    path: '*'
  }
];

export default routes;
