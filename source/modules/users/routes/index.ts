/**
 * Users routes module.
 *
 * @module users/routes
 */

export default [
  {
    component: () => import('../components/sign-in'),
    name: 'users-sign-in',
    path: '/users/sign-in'
  },
  {
    component: () => import('../components/index'),
    name: 'users-index',
    path: '/users'
  },
  {
    component: () => import('../components/password'),
    name: 'users-password',
    path: '/users/password'
  }
];
