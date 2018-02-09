/**
 * AWS SSM parameters config.
 *
 * @module config/profiles
 */

module.exports = {
  region: 'us-east-1' /* Default AWS region */,
  profiles: {
    /* This are the AWS profiles to use for each stage */
    development: 'default',
    production: 'default',
    staging: 'default',
    local: 'default'
  }
};
