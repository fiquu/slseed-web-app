module.exports = {
  PublicAppBucket: {
    Description: 'Public App Bucket',
    Value: {
      Ref: 'PublicAppBucket'
    },
    Export: {
      Name: {
        'Fn::Sub': '${AWS::StackName}:public-app-bucket'
      }
    }
  },
  PublicAppCloudFrontDist: {
    Description: 'Public App CloudFront Dist',
    Value: {
      Ref: 'PublicAppCloudFrontDist'
    },
    Export: {
      Name: {
        'Fn::Sub': '${AWS::StackName}:public-app-cloudfront-dist'
      }
    }
  },
};
