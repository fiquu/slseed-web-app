/**
 * Users routes module.
 *
 * @module users/routes
 */

export default [
  {
    component: () => import('@/components/users/sign-in'),
    name: 'users-sign-in',
    path: '/'
  },
  {
    component: () => import('@/components/users/index'),
    name: 'users-index',
    path: '/users'
  },
  {
    component: () => import('@/components/users/password'),
    name: 'users-password',
    path: '/password'
  }
];
