/**
 * Cognito service.
 *
 * @module services/cognito
 */

import { CognitoIdentityServiceProvider } from 'aws-sdk';

export default {
  install: Vue => {
    const $cognito = new Vue({
      methods: {
        /**
         * Creates a user.
         *
         * @param {String} pool The pool name to create into.
         * @param {String} params The user's params to create with.
         *
         * @returns {Promise} A Promise that resolves to the user data.
         */
        adminCreateUser(pool, values) {
          return new Promise(async (resolve, reject) => {
            try {
              await this.$auth.setAWSCredentials();

              const cognito = new CognitoIdentityServiceProvider();
              const params = {
                UserPoolId: pool,
                ...values
              };

              cognito.adminCreateUser(params, (err, data) => {
                if (err) {
                  reject(err);
                  return;
                }

                resolve(data);
              });
            } catch (err) {
              reject(err);
            }
          });
        },

        /**
         * Fetches a user's data.
         *
         * @param {String} pool The pool name to fetch from.
         * @param {String} sub The user's sub to fetch.
         *
         * @returns {Promise} A Promise that resolves to the user data.
         */
        adminGetUser(pool, sub) {
          return new Promise(async (resolve, reject) => {
            try {
              await this.$auth.setAWSCredentials();

              const cognito = new CognitoIdentityServiceProvider();
              const params = {
                UserPoolId: pool,
                Username: sub
              };

              cognito.adminGetUser(params, (err, data) => {
                if (err) {
                  reject(err);
                  return;
                }

                resolve(data);
              });
            } catch (err) {
              reject(err);
            }
          });
        },

        /**
         * Fetches a user's data.
         *
         * @param {String} pool The pool name to fetch from.
         * @param {String} sub The user's sub to fetch.
         *
         * @returns {Promise} A Promise that resolves to the user data.
         */
        adminDeleteUser(pool, sub) {
          return new Promise(async (resolve, reject) => {
            try {
              await this.$auth.setAWSCredentials();

              const cognito = new CognitoIdentityServiceProvider();
              const params = {
                UserPoolId: pool,
                Username: sub
              };

              cognito.adminDeleteUser(params, (err, data) => {
                if (err) {
                  reject(err);
                  return;
                }

                resolve(data);
              });
            } catch (err) {
              reject(err);
            }
          });
        },

        /**
         * Updates a user's attributes.
         *
         * @param {String} pool The pool name to fetch from.
         * @param {String} sub The user's sub to fetch.
         *
         * @returns {Promise} A Promise that resolves to the user data.
         */
        adminUpdateUserAttributes(pool, sub, attrs) {
          return new Promise(async (resolve, reject) => {
            try {
              await this.$auth.setAWSCredentials();

              const cognito = new CognitoIdentityServiceProvider();
              const params = {
                UserAttributes: attrs,
                UserPoolId: pool,
                Username: sub
              };

              cognito.adminUpdateUserAttributes(params, (err, data) => {
                if (err) {
                  reject(err);
                  return;
                }

                resolve(data);
              });
            } catch (err) {
              reject(err);
            }
          });
        },

        /**
         * Lists a user's groups.
         *
         * @param {String} pool The pool name to fetch from.
         * @param {String} sub The user's sub to fetch.
         *
         * @returns {Promise} A Promise that resolves to the user data.
         */
        adminListGroupsForUser(pool, sub) {
          return new Promise(async (resolve, reject) => {
            try {
              await this.$auth.setAWSCredentials();

              const cognito = new CognitoIdentityServiceProvider();
              const params = {
                UserPoolId: pool,
                Username: sub
              };

              cognito.adminListGroupsForUser(params, (err, data) => {
                if (err) {
                  reject(err);
                  return;
                }

                resolve(data);
              });
            } catch (err) {
              reject(err);
            }
          });
        },

        /**
         * Disables a user's account.
         *
         * @param {String} pool The pool name to disable from.
         * @param {String} sub The user's sub to disable.
         *
         * @returns {Promise} A Promise.
         */
        adminDisableUser(pool, sub) {
          return new Promise(async (resolve, reject) => {
            try {
              await this.$auth.setAWSCredentials();

              const cognito = new CognitoIdentityServiceProvider();
              const params = {
                UserPoolId: pool,
                Username: sub
              };

              cognito.adminDisableUser(params, (err, data) => {
                if (err) {
                  reject(err);
                  return;
                }

                resolve(data);
              });
            } catch (err) {
              reject(err);
            }
          });
        },

        /**
         * Enables a user's account.
         *
         * @param {String} pool The pool name to enable from.
         * @param {String} sub The user's sub to enable.
         *
         * @returns {Promise} A Promise.
         */
        adminEnableUser(pool, sub) {
          return new Promise(async (resolve, reject) => {
            try {
              await this.$auth.setAWSCredentials();

              const cognito = new CognitoIdentityServiceProvider();
              const params = {
                UserPoolId: pool,
                Username: sub
              };

              cognito.adminEnableUser(params, (err, data) => {
                if (err) {
                  reject(err);
                  return;
                }

                resolve(data);
              });
            } catch (err) {
              reject(err);
            }
          });
        },

        /**
         * Adds a user's to a group.
         *
         * @param {String} pool The pool name to enable from.
         * @param {String} sub The user's sub to enable.
         * @param {Object} values Additional values.
         *
         * @returns {Promise} A Promise.
         */
        adminAddUserToGroup(pool, sub, group, values) {
          return new Promise(async (resolve, reject) => {
            try {
              await this.$auth.setAWSCredentials();

              const cognito = new CognitoIdentityServiceProvider();
              const params = {
                UserPoolId: pool,
                GroupName: group,
                Username: sub,
                ...values
              };

              cognito.adminAddUserToGroup(params, (err, data) => {
                if (err) {
                  reject(err);
                  return;
                }

                resolve(data);
              });
            } catch (err) {
              reject(err);
            }
          });
        },

        /**
         * Removes a user's from a group.
         *
         * @param {String} pool The pool name to enable from.
         * @param {String} sub The user's sub to enable.
         * @param {Object} values Additional values.
         *
         * @returns {Promise} A Promise.
         */
        adminRemoveUserFromGroup(pool, sub, group, values) {
          return new Promise(async (resolve, reject) => {
            try {
              await this.$auth.setAWSCredentials();

              const cognito = new CognitoIdentityServiceProvider();
              const params = {
                UserPoolId: pool,
                GroupName: group,
                Username: sub,
                ...values
              };

              cognito.adminRemoveUserFromGroup(params, (err, data) => {
                if (err) {
                  reject(err);
                  return;
                }

                resolve(data);
              });
            } catch (err) {
              reject(err);
            }
          });
        },

        /**
         * Lists a pool's available groups.
         *
         * @param {String} pool The pool name to enable from.
         * @param {Object} values Optional additional values.
         *
         * @returns {Promise} A Promise.
         */
        listGroups(pool, values) {
          return new Promise(async (resolve, reject) => {
            try {
              await this.$auth.setAWSCredentials();

              const cognito = new CognitoIdentityServiceProvider();
              const params = {
                UserPoolId: pool,
                ...values
              };

              cognito.listGroups(params, (err, data) => {
                if (err) {
                  reject(err);
                  return;
                }

                resolve(data);
              });
            } catch (err) {
              reject(err);
            }
          });
        }
      }
    });

    Object.defineProperty(Vue.prototype, '$cognito', {
      value: $cognito
    });
  }
};
