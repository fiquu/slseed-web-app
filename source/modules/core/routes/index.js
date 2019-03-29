/**
 * Core routes module.
 *
 * @module core/routes
 */

export default [
  {
    component: () => import('@/components/dashboard'),
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      requiresAuth: true
    }
  }
];
