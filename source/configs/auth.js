/**
 * Auth config module.
 *
 * @module configs/auth
 */

export default {
  // IMPORTANT: These values MUST be configured per-app.
  identityPoolId: process.env.COGNITO_IDENTITY_POOL_ID,
  userPoolId: process.env.COGNITO_USER_POOL_ID,
  clientId: process.env.COGNITO_APP_CLIENT_ID
};
