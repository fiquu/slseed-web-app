/**
 * Deploy config.
 *
 * @module config/deploy
 */

module.exports = {
  cloudfront: {
    ssmParam: 'cloudfront-dist-id' // This is the SSM param name to resolve
  },
  s3: {
    ssmParam: 'public-apps-bucket' // This is the SSM param name to resolve
  }
};
