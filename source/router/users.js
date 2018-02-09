/**
 * Router users module.
 *
 * @module router/users
 */

import UsersPassword from '@/components/users/password';
import UsersSignIn from '@/components/users/sign-in';

export default [
  {
    path: '/',
    name: 'users-sign-in',
    component: UsersSignIn
  },
  {
    path: '/password',
    name: 'users-password',
    component: UsersPassword
  }
];
