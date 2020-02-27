module.exports = {
  /**
   * Cognito Identity Pool Id SSM Parameter.
   */
  CognitoIdentityPoolIdParam: {
    Type: 'AWS::SSM::Parameter',
    Properties: {
      Name: {
        'Fn::Sub': '/${ProjectName}/${Environment}/cognito-identity-pool-id'
      },
      Description: {
        'Fn::Sub': '${ProjectTitle} Cognito Identity Pool Id [${Environment}]'
      },
      Type: 'String',
      Value: {
        'Ref': '${CognitoIdentityPoolId}'
      }
    }
  },

  /**
   * Cognito User Pool Id SSM Parameter.
   */
  CognitoUserPoolIdParam: {
    Type: 'AWS::SSM::Parameter',
    Properties: {
      Name: {
        'Fn::Sub': '/${ProjectName}/${Environment}/cognito-user-pool-id'
      },
      Description: {
        'Fn::Sub': '${ProjectTitle} Cognito User Pool Id [${Environment}]'
      },
      Type: 'String',
      Value: {
        'Ref': '${CognitoUserPoolId}'
      }
    }
  },

  /**
   * Cognito User Pool Client Id SSM Parameter.
   */
  CognitoUserPoolClientIdParam: {
    Type: 'AWS::SSM::Parameter',
    Properties: {
      Name: {
        'Fn::Sub': '/${ProjectName}/${Environment}/cognito-user-pool-client-id'
      },
      Description: {
        'Fn::Sub': '${ProjectTitle} Cognito User Pool Id [${Environment}]'
      },
      Type: 'String',
      Value: {
        'Ref': '${CognitoUserPoolClientId}'
      }
    }
  }
};
