module.exports = [
  /* This are the values to map from SSM parameters to env variables. */
  /* IMPORTANT: Values starting with a "!" will not be prefixed with "VUE_APP_" (private). */
  '!public-app-cloudfront-dist',
  '!public-app-bucket',

  'cognito-user-pool-client-id',
  'cognito-identity-pool-id',
  'cognito-user-pool-id',

  'api-endpoint'
];
