/**
 * Router users module.
 *
 * @module router/users
 */

import UsersPassword from '@/components/users/password';
import UsersSignIn from '@/components/users/sign-in';
import UsersIndex from '@/components/users/index';

export default [
  {
    path: '/',
    name: 'users-sign-in',
    component: UsersSignIn
  },
  {
    path: '/users',
    name: 'users-index',
    component: UsersIndex
  },
  {
    path: '/password',
    name: 'users-password',
    component: UsersPassword
  }
];
