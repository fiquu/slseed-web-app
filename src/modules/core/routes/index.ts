/**
 * Core routes module.
 *
 * @module core/routes
 */

import { RouteConfig } from 'vue-router';

type NotFoundComponent = Promise<typeof import('../components/not-found.vue')>;

const routes: RouteConfig[] = [
  {
    redirect: '/dashboard',
    name: 'index',
    path: '/'
  },
  {
    component: (): NotFoundComponent => import('../components/not-found.vue'),
    name: 'not-found',
    path: '*'
  }
];

export default routes;
