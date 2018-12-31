/**
 * Deploy config.
 *
 * @module configs/deploy
 */

module.exports = {
  cloudfront: {
    ssmParam: 'public-app-cloudfront-dist-id' // This is the SSM param name to resolve
  },
  s3: {
    ssmParam: 'public-app-s3-bucket' // This is the SSM param name to resolve
  }
};
