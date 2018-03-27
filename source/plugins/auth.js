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

let payload;

/**
 * Retrieves current user token.
 *
 * @param {Object} currentUser The current user in session.
 *
 * @returns {Promise} A Promise resolving to the session object.
 */
function getUserSession(currentUser) {
  return new Promise((resolve, reject) => {
    currentUser.getSession((err, session) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(session);
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
 * @returns {Promise} A Promise resolving the current user session.
 */
function authUser() {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return Promise.reject(new Error('No current user!'));
  }

  return getUserSession(currentUser);
}

/**
 * Retrieves the appropriate token to perform HTTP requests.
 *
 * @returns {Promise} A Promise resolving the JWT token.
 */
function getAuthToken() {
  return authUser().then(session => session.getIdToken().getJwtToken());
}

/**
 * Checks if the user has signed in.
 *
 * @returns {Boolean} Whether the user has signed in.
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
async function get(prop) {
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
 *
 * @returns {Promise} An empty Promise.
 */
function setAWSCredentials() {
  const cognito = `cognito-idp.${defaults.region}.amazonaws.com/${defaults.credentials.UserPoolId}`;

  return getAuthToken().then(token => {
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
    router.beforeEach(async (to, from, next) => {
      try {
        const session = await authUser();

        payload = session.getIdToken().decodePayload();

        next();
      } catch (err) {
        if (to.meta.requiresAuth) {
          next(defaults.paths.signIn);
        } else {
          next();
        }
      }
    });

    /**
     * Add auth headers to every request.
     */
    Vue.axios.interceptors.request.use(
      async config => {
        try {
          const token = await getAuthToken();

          if (!token) {
            throw new Error('JWT token is empty!');
          }

          config.headers[AUTHORIZATION] = token;

          return config;
        } catch (err) {
          console.error(err);
          Promise.reject(err);
        }
      },
      err => Promise.reject(err)
    );

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
