/**
 * Auth service module.
 *
 * @module service/auth
 */

import { CognitoUserPool, AuthenticationDetails, CognitoUser, CognitoUserSession, IAuthenticationCallback } from 'amazon-cognito-identity-js';
import { AxiosRequestConfig } from 'axios';
import AWS from 'aws-sdk';
import Vue from 'vue';

import config from '../configs/auth';

import router from '../services/router';
import api from '../services/api';

export interface ConfirmPasswordCallbacks {
  onFailure: (err: Error) => void;
  onSuccess: () => void;
}

export interface ForgotPasswordCallbacks {
  inputVerificationCode?: ((data: any) => void) | undefined;
  onFailure: (err: Error) => void;
  onSuccess: (data: any) => void;
}

export interface AuthData {
  password: string;
  email: string;
}

export interface ConfirmNewPasswordData extends AuthData {
  code: string;
}

export default new Vue({
  data() {
    return {
      loading: false,
      data: {}
    };
  },

  watch: {
    loading() {
      this.$emit('update');
    }
  },

  created() {
    // Assign route auth guards
    router.beforeEach(async (to, from, next) => {
      try {
        const session = await this.authUser();

        this.data = session.getIdToken().decodePayload();

        next();
      } catch (err) {
        if (to.meta.requiresAuth) {
          next(config.paths.signIn);
          return;
        }

        next();
      }
    });

    // Add auth headers to every API request
    const interceptor = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
      const token = await this.getAuthToken();

      if (!token) {
        throw new Error('JWT token is empty!');
      }

      config.headers.Authorization = token;

      return config;
    };

    api.interceptors.request.use(interceptor, err => Promise.reject(err));
  },

  methods: {
    /**
     * Retrieves current user token.
     *
     * @param {Object} currentUser The current user in session.
     *
     * @returns {Promise} A Promise resolving to the session object.
     */
    getUserSession(currentUser: CognitoUser): Promise<CognitoUserSession> {
      return new Promise((resolve, reject) => {
        currentUser.getSession((err: Error, session: CognitoUserSession) => {
          if (err) {
            reject(err);
            return;
          }

          if (!session.isValid()) {
            reject(new Error('Cognito session is invalid!'));
            return;
          }

          resolve(session);
        });
      });
    },

    /**
     * Retrieves current user in session.
     *
     * @returns {Object} The current user in session.
     */
    getCurrentUser(): CognitoUser | null {
      const userPool = new CognitoUserPool(config.credentials);

      return userPool.getCurrentUser();
    },

    /**
     * Authorizes current user.
     *
     * @returns {Promise} A Promise resolving the current user session.
     */
    authUser(): Promise<CognitoUserSession> {
      const currentUser = this.getCurrentUser();

      if (!currentUser) {
        return Promise.reject(new Error('No current user!'));
      }

      return this.getUserSession(currentUser);
    },

    /**
     * Retrieves the appropriate token to perform HTTP requests.
     *
     * @returns {Promise} A Promise resolving to the JWT token.
     */
    getAuthToken(): Promise<string> {
      return this.authUser().then(session => session.getIdToken().getJwtToken());
    },

    /**
     * Checks if the user has signed in.
     *
     * @returns {Boolean} Whether the user has signed in.
     */
    isSignedIn() {
      return !!this.getCurrentUser();
    },

    /**
     * Signs a user in.
     *
     * @param {Object} data The data to sign in with.
     * @param {Object} callbacks The callbacks objects.
     *
     * @returns {CognitoUser} The cognito user instance.
     */
    async signIn({ email, password }: AuthData, callbacks: IAuthenticationCallback) {
      const userPool = new CognitoUserPool(config.credentials);
      const user = new CognitoUser({
        Username: email,
        Pool: userPool
      });

      const authenticationDetails = new AuthenticationDetails({
        Password: password,
        Username: email
      });

      await new Promise(resolve => {
        user.authenticateUser(authenticationDetails, {
          onFailure: err => {
            if (typeof callbacks.onFailure === 'function') {
              callbacks.onFailure(err);
            }

            resolve();
          },

          onSuccess: res => {
            this.$emit('signedIn');

            if (typeof callbacks.onSuccess === 'function') {
              callbacks.onSuccess(res);
            }

            resolve();
          },

          newPasswordRequired: (userAttributes, requiredAttributes) => {
            if (typeof callbacks.newPasswordRequired === 'function') {
              callbacks.newPasswordRequired(userAttributes, requiredAttributes);
            }

            resolve();
          }
        });
      });

      return user;
    },

    /**
     * Signs a user out and redirects.
     *
     * @param {boolean} keep Whether to keep current URL.
     */
    signOut(keep?: boolean): void {
      if (!keep) {
        this.loading = true;
      }

      const currentUser = this.getCurrentUser();

      if (currentUser) {
        currentUser.signOut();
        this.$emit('signedOut');
      }

      if (!keep) {
        router.replace(config.paths.signIn);
        this.loading = false;
      }
    },

    /**
     * Sets the proper AWS credentials for identity based actions.
     *
     * @returns {Promise} An empty Promise.
     */
    async setAWSCredentials(): Promise<void> {
      const provider = `cognito-idp.${config.region}.amazonaws.com/${config.credentials.UserPoolId}`;
      const token = await this.getAuthToken();

      if (!token) {
        throw new Error('No token available to set AWS credentials!');
      }

      const credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: config.identityPoolId,
        Logins: {
          [provider]: token
        }
      });

      // Set proper AWS credentials
      AWS.config.update({
        region: config.region,
        credentials
      });

      // Call refresh method in order to authenticate user and get new temp credentials
      await credentials.refreshPromise();
    },

    /**
     * Starts a password recovery flow.
     *
     * @param {Object} data The user's data.
     * @param {Object} callbacks The callbacks object.
     */
    forgotPassword(data: AuthData, callbacks: ForgotPasswordCallbacks): CognitoUser {
      const userPool = new CognitoUserPool(config.credentials);
      const user = new CognitoUser({
        Username: data.email,
        Pool: userPool
      });

      user.forgotPassword(callbacks);

      return user;
    },

    /**
     * Confirms a password change.
     *
     * @param {Object} data The data to perform the password change.
     * @param {Object} callbacks The callbacks object.
     */
    confirmPassword({ email, code, password }: ConfirmNewPasswordData, callbacks: ConfirmPasswordCallbacks): void {
      const userPool = new CognitoUserPool(config.credentials);
      const user = new CognitoUser({
        Username: email,
        Pool: userPool
      });

      user.confirmPassword(code, password, callbacks);
    }
  }
});
