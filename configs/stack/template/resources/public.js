module.exports = {
  /**
   * Public App Bucket (for app hosting).
   */
  PublicAppBucket: {
    Type: 'AWS::S3::Bucket'
  },

  /**
   * Public App CloudFront Origin Access Identity.
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
   * Public App CloudFront Distribution.
   */
  PublicAppCloudFrontDist: {
    Type: 'AWS::CloudFront::Distribution',
    DependsOn: ['PublicAppBucket', 'PublicAppBucketAccess'],
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
   * Bucket Policy.
   */
  PublicAppBucketPolicy: {
    type: 'AWS::S3::BucketPolicy',
    DependsOn: ['PublicAppBucket', 'PublicAppCloudFrontDist'],
    Properties: {
      Bucket: {
        Ref: 'PublicAppBucket'
      }
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
            AWS: {
              'Fn::Sub': 'arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity ${PublicAppCloudFrontDist}'
            }
          },
          Resource: {
            'Fn::Sub': 'arn:aws:s3:::${PublicAppBucket}/*'
          }
        }
      ]
    }
  },

  /**
   * Public App Bucket SSM Parameter.
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
   *  Public App CloudFront Distribution Id SSM Parameter.
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
