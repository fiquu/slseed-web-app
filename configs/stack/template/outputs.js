module.exports = {
  PublicAppBucket: {
    Description: 'Public App Bucket',
    Value: {
      Ref: 'PublicAppBucket'
    }
  },
  PublicAppCloudFrontDist: {
    Description: 'Public App CloudFront Distribution',
    Value: {
      Ref: 'PublicAppCloudFrontDist'
    }
  },
  PublicAppCloudFrontDistDomain: {
    Description: 'Public App Cloudfront Distribution Domain Name',
    Value: {
      GetAtt: 'PublicAppCloudFrontDist.DomainName'
    }
  }
};
