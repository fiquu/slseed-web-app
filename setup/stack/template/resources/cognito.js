module.exports = {
  /**
   * Cognito Identity Pool Id.
   */
  CognitoIdentityPoolId: {
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
   * Cognito User Pool Id.
   */
  CognitoUserPoolId: {
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
   * Cognito User Pool Client Id.
   */
  CognitoUserPoolClientId: {
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
