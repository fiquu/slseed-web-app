const is = require('@fiquu/is');

module.exports = [
  {
    name: 'ApiEndpoint',
    type: 'input',
    message: 'API Endpoint URI',
    default: 'http://localhost:8080',
    validate: val => /^(https?):\/\/[-\w\d@:.,%/?&=]+$/.test(val)
  },
  {
    name: 'CognitoUserPoolId',
    type: 'input',
    message: 'Cognito User Pool Id',
    default: null,
    validate: val => !is.empty(val)
  },
  {
    name: 'CognitoUserPoolClientId',
    type: 'input',
    message: 'Cognito User Pool Client Id',
    default: null,
    validate: val => !is.empty(val)
  },
  {
    name: 'CognitoIdentityPoolId',
    type: 'input',
    message: 'Cognito Identity Pool Id',
    default: null,
    validate: val => !is.empty(val)
  }
];
