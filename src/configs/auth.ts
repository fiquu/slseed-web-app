const {
  VUE_APP_COGNITO_USER_POOL_CLIENT_ID,
  VUE_APP_COGNITO_IDENTITY_POOL_ID,
  VUE_APP_COGNITO_USER_POOL_ID
} = process.env;

/**
 * @see https://aws-amplify.github.io/docs/js/authentication#manual-setup
 */
const config = {
  Auth: {
    userPoolWebClientId: VUE_APP_COGNITO_USER_POOL_CLIENT_ID,
    identityPoolId: VUE_APP_COGNITO_IDENTITY_POOL_ID,
    userPoolId: VUE_APP_COGNITO_USER_POOL_ID,
    mandatorySignIn: true,
    region: 'us-east-1',
    oauth: {
      redirectSignOut: null,
      redirectSignIn: null,
      returnTo: null,
      domain: null
    }
  }
};

export default config;
