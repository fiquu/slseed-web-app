/**
 * Auth service module.
 *
 * @module service/auth
 */

import { AxiosRequestConfig } from 'axios';
import AWS from 'aws-sdk';
import Vue from 'vue';
import {
  CognitoUserPool, AuthenticationDetails, CognitoUser, CognitoUserSession, IAuthenticationCallback
} from 'amazon-cognito-identity-js';

import config from '@/configs/auth';
import router from './router';
import api from './api';
import {
  AuthServiceData, AuthData, ConfirmNewPasswordData, ConfirmPasswordCallbacks, ForgotPasswordCallbacks
} from './auth.d';

export default new Vue({
  data(): AuthServiceData {
    return {
      loading: false,
      data: {}
    };
  },

  watch: {
    loading(): void {
      this.$emit('update');
    }
  },

  created(): void {
    this.addApiInterceptors();
    this.addRouteGuards();
  },

  methods: {
    addApiInterceptors(): void {
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

    addRouteGuards(): void {
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
    },

    createCognitoUser(Username: string): CognitoUser {
      const Pool = new CognitoUserPool(config.credentials);

      return new CognitoUser({ Username, Pool });
    },

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

    getCurrentUser(): CognitoUser | null {
      const { getCurrentUser } = new CognitoUserPool(config.credentials);

      return getCurrentUser();
    },

    authUser(): Promise<CognitoUserSession> {
      const currentUser = this.getCurrentUser();

      if (!currentUser) {
        return Promise.reject(new Error('No current user!'));
      }

      return this.getUserSession(currentUser);
    },

    getAuthToken(): Promise<string> {
      return this.authUser().then((session: any) => session.getIdToken().getJwtToken());
    },

    isSignedIn(): boolean {
      return !!this.getCurrentUser();
    },

    async signIn({ email, password }: AuthData, callbacks: IAuthenticationCallback): Promise<CognitoUser> {
      const user = this.createCognitoUser(email);

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

    forgotPassword({ email }: AuthData, callbacks: ForgotPasswordCallbacks): CognitoUser {
      const user = this.createCognitoUser(email);

      user.forgotPassword(callbacks);

      return user;
    },

    confirmPassword({ email, code, password }: ConfirmNewPasswordData, callbacks: ConfirmPasswordCallbacks): void {
      const user = this.createCognitoUser(email);

      user.confirmPassword(code, password, callbacks);
    }
  }
});
