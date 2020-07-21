module.exports = {
  /**
   * Public App Bucket.
   *
   * This is used for app storage.
   */
  PublicAppBucket: {
    Type: 'AWS::S3::Bucket'
  },

  /**
   * Public App CloudFront Origin Access Identity.
   *
   * This is used to allow CloudFront to access the bucket.
   */
  PublicAppBucketAccess: {
    Type: 'AWS::CloudFront::CloudFrontOriginAccessIdentity',
    Properties: {
      CloudFrontOriginAccessIdentityConfig: {
        Comment: {
          'Fn::Sub': '${ProjectTitle} Public App Access Origin Identity [${Environment}]'
        }
      }
    }
  },

  /**
   * Public App Bucket Policy.
   *
   * This is used to allow the distribution to read from the bucket.
   */
  PublicAppBucketPolicy: {
    Type: 'AWS::S3::BucketPolicy',
    DependsOn: ['PublicAppBucket', 'PublicAppBucketAccess'],
    Properties: {
      Bucket: {
        Ref: 'PublicAppBucket'
      },
      PolicyDocument: {
        Version: '2008-10-17',
        Id: 'PolicyForCloudFrontPrivateContent',
        Statement: [
          {
            Action: ['s3:GetObject'],
            Effect: 'Allow',
            Sid: '1',
            Principal: {
              CanonicalUser: {
                'Fn::GetAtt': ['PublicAppBucketAccess', 'S3CanonicalUserId']
              }
            },
            Resource: {
              'Fn::Sub': '${PublicAppBucket.Arn}/*'
            }
          }
        ]
      }
    }
  },

  /**
   * Public App CloudFront Distribution.
   *
   * This is used to serve the app.
   */
  PublicAppCloudFrontDist: {
    Type: 'AWS::CloudFront::Distribution',
    DependsOn: ['PublicAppBucket', 'PublicAppBucketAccess', 'CspHeadersLambdaEdgeFunction'],
    Properties: {
      DistributionConfig: {
        DefaultRootObject: 'index.html',
        PriceClass: 'PriceClass_All',
        Enabled: true,
        Comment: {
          'Fn::Sub': '${ProjectTitle} Public App [${Environment}]'
        },
        Origins: [
          {
            DomainName: {
              'Fn::GetAtt': ['PublicAppBucket', 'DomainName']
            },
            Id: {
              Ref: 'PublicAppBucket'
            },
            S3OriginConfig: {
              OriginAccessIdentity: {
                'Fn::Sub': 'origin-access-identity/cloudfront/${PublicAppBucketAccess}'
              }
            }
          }
        ],
        DefaultCacheBehavior: {
          ViewerProtocolPolicy: 'redirect-to-https',
          Compress: true,
          LambdaFunctionAssociations: [{
            // CSP headers function ref
            EventType: 'origin-response',
            LambdaFunctionARN: {
              Ref: 'CspHeadersLambdaEdgeFunction.Version'
            }
          }],
          ForwardedValues: {
            QueryString: false
          },
          TargetOriginId: {
            Ref: 'PublicAppBucket'
          }
        }
      }
    }
  },

  /**
   * Public App Bucket SSM Parameter.
   *
   * This is used to store the distribution id parameter.
   */
  PublicAppBucketParam: {
    Type: 'AWS::SSM::Parameter',
    DependsOn: ['PublicAppBucket'],
    Properties: {
      Type: 'String',
      Name: {
        'Fn::Sub': '/${ProjectName}/${Environment}/public-app-bucket'
      },
      Description: {
        'Fn::Sub': '${ProjectTitle} Public App Bucket [${Environment}]'
      },
      Value: {
        Ref: 'PublicAppBucket'
      }
    }
  },

  /**
   * Public App CloudFront Distribution Id SSM Parameter.
   *
   * This is used to store the bucket name parameter.
   */
  PublicAppCloudFrontDistIdParam: {
    Type: 'AWS::SSM::Parameter',
    DependsOn: ['PublicAppCloudFrontDist'],
    Properties: {
      Type: 'String',
      Name: {
        'Fn::Sub': '/${ProjectName}/${Environment}/public-app-cloudfront-dist'
      },
      Description: {
        'Fn::Sub': '${ProjectTitle} Public App CloudFront Distribution [${Environment}]'
      },
      Value: {
        Ref: 'PublicAppCloudFrontDist'
      }
    }
  }
};
