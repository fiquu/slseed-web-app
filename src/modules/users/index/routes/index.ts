import { RouteConfig } from 'vue-router';

type UsersIndexView = Promise<typeof import('../views/index.vue')>;

const routes: RouteConfig[] = [{
  component: (): UsersIndexView => import(
    /* webpackChunkName: "users-index" */
    '../views/index.vue'
  ),
  name: 'users-index',
  path: '/users',
  meta: {
    requiresAuth: true
  }
}];

export default routes;
