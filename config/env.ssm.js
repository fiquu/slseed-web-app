/**
 * This are the values to map from SSM parameters to env variables.
 *
 * IMPORTANT: You should comment the ones you're not using in your instance.
 */
module.exports = {
  [`/mmun/${process.env.NODE_ENV}/cognito-identity-pool-id`]: 'COGNITO_DIRECTORS_IDENTITY_POOL_ID',

  [`/mmun/${process.env.NODE_ENV}/public-uploads-bucket`]: 'PUBLIC_UPLOADS_BUCKET',
  [`/mmun/${process.env.NODE_ENV}/public-uploads-host`]: 'PUBLIC_UPLOADS_HOST',

  [`/mmun/${process.env.NODE_ENV}/google-api-key`]: 'GOOGLE_API_KEY',

  [`/mmun/${process.env.NODE_ENV}/facebook-app-id`]: 'FACEBOOK_APP_ID'
};
