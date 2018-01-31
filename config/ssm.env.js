/**
 * Config main module.
 *
 * @module config/index
 */

module.exports = {
  region: 'us-east-1' /* Default AWS region */,
  profiles: {
    /* This are the AWS profiles to use for each stage */
    development: 'default',
    production: 'default',
    staging: 'default',
    local: 'default'
  },
  params: [
    /* This are the values to map from SSM parameters to env variables. */
    /* IMPORTANT: You should comment the ones you're not using in your instance. */

    'cognito-identity-pool-id',
    'cognito-app-client-id',
    'cognito-user-pool-id'

    // 'public-uploads-bucket',
    // 'public-uploads-host',

    // 'facebook-app-id',
    // 'google-api-key'
  ]
};
