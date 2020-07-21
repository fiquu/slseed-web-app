const { readFileSync } = require('fs');
const { join } = require('path');

module.exports = {
  /**
   * Public App Headers lambda function IAM role.
   */
  HeadersLambdaEdgeFunctionRole: {
    Type: 'AWS::IAM::Role',
    Properties: {
      Path: '/',
      ManagedPolicyArns: [
        'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole'
      ],
      AssumeRolePolicyDocument: {
        Version: '2012-10-17',
        Statement: [{
          Sid: 'AllowLambdaServiceToAssumeRole',
          Effect: 'Allow',
          Action: ['sts:AssumeRole'],
          Principal: {
            Service: [
              'lambda.amazonaws.com',
              'edgelambda.amazonaws.com'
            ]
          }
        }]
      }
    }
  },

  /**
   * Public App Headers lambda function.
   */
  HeadersLambdaEdgeFunction: {
    Type: 'AWS::Serverless::Function',
    DependsOn: ['HeadersLambdaEdgeFunctionRole'],
    Properties: {
      InlineCode: readFileSync(join('functions', 'headers.js')).toString(),
      AutoPublishAlias: 'live',
      Handler: 'index.handler',
      Runtime: 'nodejs12.x',
      MemorySize: 128,
      Timeout: 5,
      Description: {
        'Fn::Sub': '${ProjectTitle} Public App Security headers edge function [${Environment}]'
      },
      FunctionName: {
        'Fn::Sub': '${ProjectName}-${Environment}-headers-fn'
      },
      Role: {
        'Fn::GetAtt': ['HeadersLambdaEdgeFunctionRole', 'Arn']
      }
    }
  }
};
