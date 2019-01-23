module.exports = {
  /**
   * API endpoint URL.
   */
  ApiEndpointParam: {
    Type: 'AWS::SSM::Parameter',
    Properties: {
      Name: {
        'Fn::Sub': '/${ProjectName}/${Environment}/api-endpoint'
      },
      Description: {
        'Fn::Sub': '${ProjectTitle} Database URI [${Environment}]'
      },
      Type: 'String',
      Value: {
        Ref: 'ApiEndpoint'
      }
    }
  }
};
