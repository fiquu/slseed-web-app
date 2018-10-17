/**
 * AWS SSM parameters config.
 *
 * @module config/index
 */

module.exports = [
  /* This are the values to map from SSM parameters to env variables. */
  /* IMPORTANT: You should comment the ones you're not using in your instance. */

  'cognito-user-pool-client-id',
  'cognito-identity-pool-id',
  'cognito-user-pool-id',

  'api-endpoint'
];
