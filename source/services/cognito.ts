import { AdminCreateUserRequest, AdminCreateUserResponse, AdminGetUserRequest, AdminGetUserResponse, AdminDeleteUserRequest, AdminUpdateUserAttributesRequest, AttributeListType, AdminUpdateUserAttributesResponse, AdminListGroupsForUserRequest, AdminListGroupsForUserResponse, AdminDisableUserRequest, AdminDisableUserResponse, AdminEnableUserRequest, AdminEnableUserResponse, AdminAddUserToGroupRequest, AdminRemoveUserFromGroupRequest } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { CognitoIdentityServiceProvider, Response, AWSError } from 'aws-sdk';
import Vue from 'vue';

import auth from './auth';

export type AWSGenericResponse = { $response: Response<{}, AWSError>; };

export default new Vue({
  methods: {
    /**
     * Creates a user.
     *
     * @param {string} pool The pool name to create into.
     * @param {object} values The user's params to create with.
     *
     * @returns {Promise} A Promise that resolves to the user data.
     */
    async adminCreateUser(pool: string, values: AdminCreateUserRequest): Promise<AdminCreateUserResponse> {
      await auth.setAWSCredentials();

      const cognito = new CognitoIdentityServiceProvider();
      const params: AdminCreateUserRequest = {
        UserPoolId: pool,
        ...values
      };

      return cognito.adminCreateUser(params).promise();
    },

    /**
     * Fetches a user's data.
     *
     * @param {string} pool The pool name to fetch from.
     * @param {string} sub The user's sub to fetch.
     *
     * @returns {Promise} A Promise that resolves to the user data.
     */
    async adminGetUser(pool: string, sub: string): Promise<AdminGetUserResponse> {
      await auth.setAWSCredentials();

      const cognito = new CognitoIdentityServiceProvider();
      const params: AdminGetUserRequest = {
        UserPoolId: pool,
        Username: sub
      };

      return cognito.adminGetUser(params).promise();
    },

    /**
     * Fetches a user's data.
     *
     * @param {String} pool The pool name to fetch from.
     * @param {String} sub The user's sub to fetch.
     *
     * @returns {Promise} A Promise that resolves to the user data.
     */
    async adminDeleteUser(pool: string, sub: string): Promise<AWSGenericResponse> {
      await auth.setAWSCredentials();

      const cognito = new CognitoIdentityServiceProvider();
      const params: AdminDeleteUserRequest = {
        UserPoolId: pool,
        Username: sub
      };

      return cognito.adminDeleteUser(params).promise();
    },

    /**
     * Updates a User's attributes.
     *
     * @param {string} pool The pool name to fetch from.
     * @param {string} sub The user's sub to fetch.
     *
     * @returns {Promise} A Promise that resolves to the user data.
     */
    async adminUpdateUserAttributes(pool: string, sub: string, attrs: AttributeListType): Promise<AdminUpdateUserAttributesResponse> {
      await auth.setAWSCredentials();

      const cognito = new CognitoIdentityServiceProvider();
      const params: AdminUpdateUserAttributesRequest = {
        UserAttributes: attrs,
        UserPoolId: pool,
        Username: sub
      };

      return cognito.adminUpdateUserAttributes(params).promise();
    },

    /**
     * Lists a User's groups.
     *
     * @param {string} pool The pool name to fetch from.
     * @param {string} sub The user's sub to fetch.
     *
     * @returns {Promise} A Promise that resolves to the user data.
     */
    async adminListGroupsForUser(pool: string, sub: string): Promise<AdminListGroupsForUserResponse> {
      await auth.setAWSCredentials();

      const cognito = new CognitoIdentityServiceProvider();
      const params: AdminListGroupsForUserRequest = {
        UserPoolId: pool,
        Username: sub
      };

      return cognito.adminListGroupsForUser(params).promise();
    },

    /**
     * Disables a user's account.
     *
     * @param {string} pool The pool name to disable from.
     * @param {string} sub The user's sub to disable.
     *
     * @returns {Promise} A Promise.
     */
    async adminDisableUser(pool: string, sub: string): Promise<AdminDisableUserResponse> {
      await auth.setAWSCredentials();

      const cognito = new CognitoIdentityServiceProvider();
      const params: AdminDisableUserRequest = {
        UserPoolId: pool,
        Username: sub
      };

      return cognito.adminDisableUser(params).promise();
    },

    /**
     * Enables a user's account.
     *
     * @param {String} pool The pool name to enable from.
     * @param {String} sub The user's sub to enable.
     *
     * @returns {Promise} A Promise.
     */
    async adminEnableUser(pool: string, sub: string): Promise<AdminEnableUserResponse> {
      await auth.setAWSCredentials();

      const cognito = new CognitoIdentityServiceProvider();
      const params: AdminEnableUserRequest = {
        UserPoolId: pool,
        Username: sub
      };

      return cognito.adminEnableUser(params).promise();
    },

    /**
     * Adds a User's to a group.
     *
     * @param {string} pool The pool name to enable from.
     * @param {string} sub The user's sub to enable.
     * @param {object} values Additional values.
     *
     * @returns {Promise} A Promise.
     */
    async adminAddUserToGroup(pool: string, sub: string, group: string, values: object): Promise<AWSGenericResponse> {
      await auth.setAWSCredentials();

      const cognito = new CognitoIdentityServiceProvider();
      const params: AdminAddUserToGroupRequest = {
        UserPoolId: pool,
        GroupName: group,
        Username: sub,
        ...values
      };

      return cognito.adminAddUserToGroup(params).promise();
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
    async adminRemoveUserFromGroup(pool: string, sub: string, group: string, values: object): Promise<AWSGenericResponse> {
      await auth.setAWSCredentials();

      const cognito = new CognitoIdentityServiceProvider();
      const params: AdminRemoveUserFromGroupRequest = {
        UserPoolId: pool,
        GroupName: group,
        Username: sub,
        ...values
      };

      return cognito.adminRemoveUserFromGroup(params).promise();
    },

    /**
     * Lists a pool's available groups.
     *
     * @param {String} pool The pool name to enable from.
     * @param {Object} values Optional additional values.
     *
     * @returns {Promise} A Promise.
     */
    async listGroups(pool: string, values: object): Promise<AdminListGroupsForUserResponse> {
      await auth.setAWSCredentials();

      const cognito = new CognitoIdentityServiceProvider();
      const params: AdminListGroupsForUserRequest = {
        UserPoolId: pool,
        Username: '',
        ...values
      };

      return cognito.listGroups(params).promise();
    }
  }
});
