const AWS = require('aws-sdk');

const { profiles } = require('../../../../configs/aws');
const package = require('../../../../package.json');

module.exports = {
  AwsRegion: {
    Description: 'Project AWS region',
    AllowedValues: [AWS.config.region],
    Default: AWS.config.region,
    Type: 'String'
  },
  Environment: {
    Description: 'Project deployment environment',
    AllowedValues: Object.keys(profiles),
    Default: process.env.NODE_ENV,
    Type: 'String'
  },
  ProjectName: {
    Description: 'Project name',
    AllowedValues: [package.name],
    Default: package.name,
    Type: 'String'
  },
  ProjectTitle: {
    Description: 'Project title',
    AllowedValues: [package.title],
    Default: package.title,
    Type: 'String'
  },
  ApiStackName: {
    Description: 'API stack name',
    AllowedValues: [`${package.name.replace(/app$/, 'api')}-${process.env.NODE_ENV}-main-stack`],
    Default: `${package.name.replace(/app$/, 'api')}-${process.env.NODE_ENV}-main-stack`,
    Type: 'String'
  }
};
