/* eslint-disable @typescript-eslint/camelcase */

export default {
  graphql_endpoint: `${process.env.VUE_APP_API_ENDPOINT}/graphql`,
  graphql_endpoint_iam_region: 'us-east-1',
  endpoints: [
    {
      name: 'WebApi',
      endpoint: process.env.VUE_APP_API_ENDPOINT
    }
  ]
};
