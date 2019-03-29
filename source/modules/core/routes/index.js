/**
 * Core routes module.
 *
 * @module core/routes
 */

export default [
  {
    path: '/',
    name: 'index',
    redirect: '/dashboard',
    meta: {
      requiresAuth: true
    }
  },
  {
    component: () => import('../components/not-found'),
    path: '*',
    name: 'not-found'
  }
];
