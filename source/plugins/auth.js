/**
 * Auth plugin module.
 *
 * @module plugins/auth
 */

import { CognitoUserPool, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk';

import config from '@/configs/auth';
import router from '@/router';

const AUTHORIZATION = 'Authorization';

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

let session;

/**
 * Retrieves current user token.
 *
 * @param {Object} currentUser The current user in session.
 *
 * @returns {Promise} The resolve promise.
 */
function getUserSession(currentUser) {
  return new Promise((resolve, reject) => {
    currentUser.getSession((err, sess) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(sess);
    });
  });
}

/**
 * Retrieves current user in session.
 *
 * @returns {Object} The current user in session.
 */
function getCurrentUser() {
  const userPool = new CognitoUserPool(defaults.credentials);

  return userPool.getCurrentUser();
}

/**
 * Authorizes current user.
 *
 * @returns {Promise} The authorization promise.
 */
function authUser() {
  return new Promise((resolve, reject) => {
    const currentUser = getCurrentUser();

    if (!currentUser) {
      resolve();
      return;
    }

    getUserSession(currentUser).then(resolve, reject);
  });
}

/**
 * Retrieves the appropriate token to perform HTTP requests.
 */
function getAuthToken() {
  return session.getIdToken().jwtToken;
}

/**
 * Checks if the user has signed in.
 *
 * @returns {Booblean} Whether the user has signed in.
 */
function isSignedIn() {
  return !!getCurrentUser();
}

/**
 * Signs a user in.
 *
 * @param {Object} callbacks The callbacks objects.
 *
 * @returns {CognitoUser} The cognito user instance.
 */
function signIn(data, callbacks) {
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
}

/**
 * Signs a user out and redirects.
 */
function signOut() {
  const currentUser = getCurrentUser();

  if (currentUser) {
    currentUser.signOut();
  }

  router.push(defaults.paths.signIn);
}

/**
 * Retrieves a property from the isToken's payload object.
 *
 * @param {String} prop The property name to retrieve.
 *
 * @returns {Mixed} The property's value.
 */
function get(prop) {
  if (!session) {
    return null;
  }

  const payload = session.getIdToken().decodePayload();

  if (!payload) {
    return null;
  }

  if (prop) {
    return payload[prop];
  }

  return payload;
}

/**
 * Sets the proper AWS credentials for identity based actions.
 */
function setAWSCredentials() {
  const cognito = `cognito-idp.${defaults.region}.amazonaws.com/${defaults.credentials.UserPoolId}`;

  /* Set proper AWS credentials */
  AWS.config.update({
    region: defaults.region,
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: defaults.identityPoolId,
      Logins: {
        [cognito]: getAuthToken()
      }
    })
  });
}

/**
 * Starts a password recovery flow.
 *
 * @param {Object} data The user's data.
 * @param {Object} callbacks The callbacks object.
 */
function forgotPassword(data, callbacks) {
  const userPool = new CognitoUserPool(defaults.credentials);

  const user = new CognitoUser({
    Username: data.email,
    Pool: userPool
  });

  user.forgotPassword(callbacks);

  return user;
}

/**
 * Confirms a password change.
 */
function confirmPassword(data, callbacks) {
  const userPool = new CognitoUserPool(defaults.credentials);

  const user = new CognitoUser({
    Username: data.email,
    Pool: userPool
  });

  user.confirmPassword(data.code, data.password, callbacks);
}

const Auth = {
  install: (Vue, options = {}) => {
    Object.assign(defaults, options);

    /* Assign route auth checks */
    router.beforeEach((to, from, next) =>
      authUser()
        .then(sess => {
          session = sess;

          if (to.meta.requiresAuth && (!sess || !sess.getIdToken())) {
            return next(defaults.paths.signIn);
          }

          return next();
        })
        .catch(next)
    );

    /**
     * Add auth headers to every request.
     */
    Vue.http.interceptors.push((req, next) => {
      req.headers.set(AUTHORIZATION, getAuthToken());
      next();
    });

    /* eslint no-param-reassign:0 */
    Vue.prototype.$auth = {
      setAWSCredentials,
      confirmPassword,
      forgotPassword,
      getAuthToken,
      isSignedIn,
      authUser,
      signOut,
      signIn,
      get
    };
  }
};

export default Auth;
