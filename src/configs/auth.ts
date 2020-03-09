/**
 * Auth config module.
 *
 * @module configs/auth
 */

import { Authconfig } from '@/services/auth.d';

const {
  VUE_APP_COGNITO_IDENTITY_POOL_ID, VUE_APP_COGNITO_USER_POOL_CLIENT_ID, VUE_APP_COGNITO_USER_POOL_ID
} = process.env;

const config: Authconfig = {
  identityPoolId: String(VUE_APP_COGNITO_IDENTITY_POOL_ID),
  region: 'us-east-1',
  credentials: {
    ClientId: String(VUE_APP_COGNITO_USER_POOL_CLIENT_ID),
    UserPoolId: String(VUE_APP_COGNITO_USER_POOL_ID)
  },
  paths: {
    signIn: '/users/sign-in'
  }
};

export default config;
