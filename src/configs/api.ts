/* eslint-disable @typescript-eslint/camelcase */

import Auth from '@aws-amplify/auth';

export default {
  graphql_endpoint: `${process.env.VUE_APP_API_ENDPOINT}/graphql`,
  graphql_endpoint_iam_region: 'us-east-1',
  endpoints: [
    {
      name: 'Web',
      endpoint: process.env.VUE_APP_API_ENDPOINT,
      custom_header: async (): Promise<object> => {
        return {
          Authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
        };
      }
    }
  ]
};
