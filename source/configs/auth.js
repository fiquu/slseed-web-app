/**
 * Auth config module.
 *
 * @module configs/auth
 */

export default {
  // IMPORTANT: These values MUST be configured per-app.
  identityPoolId: process.env.VUE_APP_COGNITO_IDENTITY_POOL_ID,
  clientId: process.env.VUE_APP_COGNITO_USER_POOL_CLIENT_ID,
  userPoolId: process.env.VUE_APP_COGNITO_USER_POOL_ID,
  paths: {
    signIn: '/users/sign-in'
  }
};
