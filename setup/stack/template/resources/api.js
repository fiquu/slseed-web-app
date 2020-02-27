module.exports = {
  /**
   * API endpoint URL.
   */
  ApiEndpointParam: {
    Type: 'AWS::SSM::Parameter',
    Properties: {
      Name: {
        'Fn::Sub': '/${GroupName}/${ProjectName}/${Environment}/api-endpoint'
      },
      Description: {
        'Fn::Sub': '${GroupTitle} ${ProjectTitle} Database URI [${Environment}]'
      },
      Type: 'String',
      Value: {
        Ref: 'ApiEndpoint'
      }
    }
  }
};
