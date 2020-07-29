import { RouteConfig } from 'vue-router';

type UsersForgotPasswordView = Promise<typeof import('../views/index.vue')>;

const routes: RouteConfig[] = [{
  component: (): UsersForgotPasswordView => import(
    /* webpackChunkName: "users-forgot-password" */
    '../views/index.vue'
  ),
  name: 'users-forgot-password',
  path: '/users/forgot-password'
}];

export default routes;
