const { profiles, region } = require('../../../configs/aws');
const { name, title } = require('../../../package.json');

const nameSlug = name.replace(/\W+/g, ' ').trim().replace(/\s+/g, '-');

module.exports = {
  AwsRegion: {
    Description: 'Project AWS region',
    AllowedValues: [region],
    Default: region,
    Type: 'String'
  },
  Environment: {
    Description: 'Project deployment environment',
    AllowedValues: Object.keys(profiles),
    Default: process.env.NODE_ENV,
    Type: 'String'
  },
  ProjectName: {
    Description: 'Project Name',
    AllowedValues: [nameSlug],
    Default: nameSlug,
    Type: 'String'
  },
  ProjectTitle: {
    Description: 'Project Title',
    AllowedValues: [title],
    Default: title,
    Type: 'String'
  }
};
