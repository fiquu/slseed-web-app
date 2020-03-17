import { RouteConfig } from 'vue-router';

type DashboardView = Promise<typeof import('../views/index.vue')>;

const routes: RouteConfig[] = [
  {
    component: (): DashboardView => import(
      /* eslint-disable capitalized-comments */
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
