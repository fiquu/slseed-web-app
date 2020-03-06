/**
 * Core routes module.
 *
 * @module core/routes
 */

export default [
  {
    redirect: '/dashboard',
    name: 'index',
    path: '/'
  },
  {
    component: () => import('../components/not-found'),
    name: 'not-found',
    path: '*'
  }
];
