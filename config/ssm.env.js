/**
 * AWS SSM parameters config.
 *
 * @module config/index
 */

module.exports = [
  /* This are the values to map from SSM parameters to env variables. */
  /* IMPORTANT: You should comment the ones you're not using in your instance. */

  'cognito-identity-pool-id',
  'cognito-app-client-id',
  'cognito-user-pool-id',

  // 'public-uploads-bucket',
  // 'public-uploads-host',

  // 'facebook-app-id',
  // 'google-api-key',

  'api-endpoint'
];
