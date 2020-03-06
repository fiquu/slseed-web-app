/**
 * Auth config module.
 *
 * @module configs/auth
 */

const { VUE_APP_COGNITO_IDENTITY_POOL_ID, VUE_APP_COGNITO_USER_POOL_CLIENT_ID, VUE_APP_COGNITO_USER_POOL_ID } = process.env;

export interface Authconfig {
  /**
   * Cognito Identity Pool Id.
   */
  identityPoolId: string;

  /**
   * AWS region.
   */
  region: string;

  /**
   * Cognito credentials.
   */
  credentials: {
    /**
     * The Cognito Client Id.
     */
    ClientId: string;

    /**
     * The Cognito User Pool Id.
     */
    UserPoolId: string;
  };

  /**
   * Auth paths.
   */
  paths: {
    /**
     * Application sign in path.
     */
    signIn: string;
  }
}

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
