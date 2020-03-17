import { RouteConfig } from 'vue-router';

type NotFoundView = Promise<typeof import('../views/not-found.vue')>;

const routes: RouteConfig[] = [
  {
    // Redirect root to dashboard
    redirect: '/dashboard',
    name: 'index',
    path: '/'
  },
  {
    component: (): NotFoundView => import(
      /* eslint-disable capitalized-comments */
      /* webpackChunkName: "not-found" */
      '../views/not-found.vue'
    ),
    name: 'not-found',
    path: '*'
  }
];

export default routes;
