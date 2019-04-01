/**
 * Auth config module.
 *
 * @module configs/auth
 */

export default {
  identityPoolId: process.env.VUE_APP_COGNITO_IDENTITY_POOL_ID,
  region: 'us-east-1',
  credentials: {
    ClientId: process.env.VUE_APP_COGNITO_USER_POOL_CLIENT_ID,
    UserPoolId: process.env.VUE_APP_COGNITO_USER_POOL_ID
  },
  paths: {
    signIn: '/users/sign-in'
  }
};
