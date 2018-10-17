/**
 * Auth plugin module.
 *
 * @module plugins/auth
 */

import { CognitoUserPool, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk';

import config from '@/configs/auth';
import router from '@/router';

const defaults = {
  identityPoolId: config.identityPoolId,
  region: 'us-east-1',
  credentials: {
    UserPoolId: config.userPoolId,
    ClientId: config.clientId
  },
  paths: {
    signIn: '/'
  }
};

const Auth = {
  install: (Vue, options = {}) => {
    Object.assign(defaults, options);

    const $auth = new Vue({
      data() {
        return {
          data: null
        };
      },

      created() {
        console.log(this);

        /* Assign route auth checks */
        router.beforeEach(async (to, from, next) => {
          try {
            const session = await this.authUser();

            this.data = session.getIdToken().decodePayload();

            next();
          } catch (err) {
            if (to.meta.requiresAuth) {
              next(defaults.paths.signIn);
            } else {
              next();
            }
          }
        });

        /* Add auth headers to every request */
        Vue.axios.interceptors.request.use(
          async config => {
            try {
              const token = await this.getAuthToken();

              if (!token) {
                throw new Error('JWT token is empty!');
              }

              config.headers.Authorization = token;

              return config;
            } catch (err) {
              console.error(err);

              return Promise.reject(err);
            }
          },
          err => Promise.reject(err)
        );
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
          const userPool = new CognitoUserPool(defaults.credentials);

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
        signIn(data, callbacks) {
          const userPool = new CognitoUserPool(defaults.credentials);

          const user = new CognitoUser({
            Username: data.email,
            Pool: userPool
          });

          const authenticationDetails = new AuthenticationDetails({
            Password: data.password,
            Username: data.email
          });

          user.authenticateUser(authenticationDetails, callbacks);

          return user;
        },

        /**
         * Signs a user out and redirects.
         *
         * @param {Boolean} keep Whether to keep current URL.
         */
        signOut(keep) {
          const currentUser = this.getCurrentUser();

          if (currentUser) {
            currentUser.signOut({
              onFailure(e) {
                console.log(e);
              },
              onSuccess(r) {
                console.log('Sign out successful.', r);
              }
            });
          }

          if (!keep) {
            window.location.href = defaults.paths.signIn;
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
        setAWSCredentials() {
          const cognito = `cognito-idp.${defaults.region}.amazonaws.com/${defaults.credentials.UserPoolId}`;

          return this.getAuthToken()

            .then(token => {
              if (!token) {
                throw new Error('No token available to set AWS credentials!');
              }

              /* Set proper AWS credentials */
              AWS.config.update({
                region: defaults.region,
                credentials: new AWS.CognitoIdentityCredentials({
                  IdentityPoolId: defaults.identityPoolId,
                  Logins: {
                    [cognito]: token
                  }
                })
              });
            })

            .then(
              () =>
                new Promise((resolve, reject) =>
                  // Call refresh method in order to authenticate user and get new temp credentials
                  AWS.config.credentials.refresh(err => {
                    if (err) {
                      reject(err);
                      return;
                    }

                    console.log('Successfully refreshed AWS credentials!');

                    resolve();
                  })
                )
            );
        },

        /**
         * Starts a password recovery flow.
         *
         * @param {Object} data The user's data.
         * @param {Object} callbacks The callbacks object.
         */
        forgotPassword(data, callbacks) {
          const userPool = new CognitoUserPool(defaults.credentials);

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
          const userPool = new CognitoUserPool(defaults.credentials);

          const user = new CognitoUser({
            Username: data.email,
            Pool: userPool
          });

          user.confirmPassword(data.code, data.password, callbacks);
        }
      }
    });

    /* eslint no-param-reassign:0 */
    Vue.prototype.$auth = $auth;
  }
};

export default Auth;
