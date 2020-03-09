module.exports = {
  /**
   * Public App S3 Bucket (for app hosting).
   */
  PublicAppS3Bucket: {
    Type: 'AWS::S3::Bucket'
  },

  /**
   * Public App CloudFront Origin Access Identity.
   */
  PublicAppS3BucketAccess: {
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
    DependsOn: ['PublicAppS3Bucket', 'PublicAppS3BucketAccess'],
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
              'Fn::GetAtt': ['PublicAppS3Bucket', 'DomainName']
            },
            Id: {
              Ref: 'PublicAppS3Bucket'
            },
            S3OriginConfig: {
              OriginAccessIdentity: {
                'Fn::Sub': 'origin-access-identity/cloudfront/${PublicAppS3BucketAccess}'
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
            Ref: 'PublicAppS3Bucket'
          }
        }
      }
    }
  },

  /**
   * Public App S3 Bucket SSM Parameter.
   */
  PublicAppS3BucketParam: {
    Type: 'AWS::SSM::Parameter',
    DependsOn: ['PublicAppS3Bucket'],
    Properties: {
      Type: 'String',
      Name: {
        'Fn::Sub': '/${ProjectName}/${Environment}/public-app-s3-bucket'
      },
      Description: {
        'Fn::Sub': '${ProjectTitle} Public App S3 Bucket [${Environment}]'
      },
      Value: {
        Ref: 'PublicAppS3Bucket'
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
        'Fn::Sub': '/${ProjectName}/${Environment}/public-app-cloudfront-dist-id'
      },
      Description: {
        'Fn::Sub': '${ProjectTitle} Public App CloudFront Distribution Id [${Environment}]'
      },
      Value: {
        Ref: 'PublicAppCloudFrontDist'
      }
    }
  }
};
