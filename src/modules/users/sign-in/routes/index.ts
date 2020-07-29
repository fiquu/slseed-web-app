import { RouteConfig } from 'vue-router';

type UsersSignInView = Promise<typeof import('../views/index.vue')>;

const routes: RouteConfig[] = [{
  component: (): UsersSignInView => import(
    /* webpackChunkName: "users-sign-in" */
    '../views/index.vue'
  ),
  name: 'users-sign-in',
  path: '/users/sign-in'
}];

export default routes;
