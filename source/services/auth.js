/**
 * Auth service module.
 *
 * @module service/auth
 */

import { CognitoUserPool, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk';
import is from 'fi-is';
import Vue from 'vue';

import config from '@/configs/auth';

import router from '@/services/router';
import api from '@/services/api';

export default new Vue({
  watch: {
    loading() {
      this.$emit('update');
    }
  },

  data() {
    return {
      loading: false,
      data: null
    };
  },

  methods: {
    /**
     * Retrieves current user token.
     *
     * @param {Object} currentUser The current user in session.
     *
     * @returns {Promise} A Promise resolving to the session object.
     */
    getUserSession(currentUser) {
      return new Promise((resolve, reject) => {
        currentUser.getSession((err, session) => {
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
    getCurrentUser() {
      const userPool = new CognitoUserPool(config.credentials);

      return userPool.getCurrentUser();
    },

    /**
     * Authorizes current user.
     *
     * @returns {Promise} A Promise resolving the current user session.
     */
    authUser() {
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
    getAuthToken() {
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
    async signIn(data, callbacks) {
      const userPool = new CognitoUserPool(config.credentials);

      const user = new CognitoUser({
        Username: data.email,
        Pool: userPool
      });

      const authenticationDetails = new AuthenticationDetails({
        Password: data.password,
        Username: data.email
      });

      await new Promise(resolve => {
        user.authenticateUser(authenticationDetails, {
          onFailure: err => {
            if (is.function(callbacks.onFailure)) {
              callbacks.onFailure(err);
            }

            resolve();
          },

          onSuccess: res => {
            this.$emit('signedIn');

            if (is.function(callbacks.onSuccess)) {
              callbacks.onSuccess(res);
            }

            resolve();
          },

          newPasswordRequired: userAttributes => {
            if (is.function(callbacks.newPasswordRequired)) {
              callbacks.newPasswordRequired(userAttributes);
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
     * @param {Boolean} keep Whether to keep current URL.
     */
    signOut(keep) {
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
     * Retrieves a property from the isToken's payload object.
     *
     * @param {String} prop The property name to retrieve.
     *
     * @returns {Mixed} The property's value.
     */
    get(prop) {
      if (!this.data) {
        return null;
      }

      if (prop) {
        return this.data[prop];
      }

      return this.data;
    },

    /**
     * Sets the proper AWS credentials for identity based actions.
     *
     * @returns {Promise} An empty Promise.
     */
    async setAWSCredentials() {
      const cognito = `cognito-idp.${config.region}.amazonaws.com/${config.credentials.UserPoolId}`;

      const token = await this.getAuthToken();

      if (!token) {
        throw new Error('No token available to set AWS credentials!');
      }

      /* Set proper AWS credentials */
      AWS.config.update({
        region: config.region,
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: config.identityPoolId,
          Logins: {
            [cognito]: token
          }
        })
      });

      // Call refresh method in order to authenticate user and get new temp credentials
      await new Promise((resolve, reject) =>
        AWS.config.credentials.refresh(err => {
          if (err) {
            reject(err);
            return;
          }

          console.log('Successfully refreshed AWS credentials!');

          resolve();
        })
      );
    },

    /**
     * Starts a password recovery flow.
     *
     * @param {Object} data The user's data.
     * @param {Object} callbacks The callbacks object.
     */
    forgotPassword(data, callbacks) {
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
    confirmPassword(data, callbacks) {
      const userPool = new CognitoUserPool(config.credentials);

      const user = new CognitoUser({
        Username: data.email,
        Pool: userPool
      });

      user.confirmPassword(data.code, data.password, callbacks);
    }
  },

  created() {
    /* Assign route auth guards */
    router.beforeEach(async (to, from, next) => {
      try {
        const session = await this.authUser();

        this.data = session.getIdToken().decodePayload();

        next();
      } catch (err) {
        if (to.meta.requiresAuth) {
          next(config.paths.signIn);
        } else {
          next();
        }
      }
    });

    /* Add auth headers to every API request */
    api.interceptors.request.use(
      async config => {
        try {
          const token = await this.getAuthToken();

          if (!token) {
            throw new Error('JWT token is empty!');
          }

          config.headers.Authorization = token;

          return config;
        } catch (error) {
          console.error(error);
          return Promise.reject(error);
        }
      },
      error => Promise.reject(error)
    );
  }
});
