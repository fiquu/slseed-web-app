/**
 * Dashboard routes module.
 *
 * @module dashboard/routes
 */

export default [
  {
    component: () => import('../components/index'),
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      requiresAuth: true
    }
  }
];
