import Auth from '@aws-amplify/auth';

/**
 * Resolves the Cognito JWT auth token.
 */
async function getAuthToken(): Promise<Record<string ,string>> {
  const user = await Auth.currentAuthenticatedUser();

  return {
    Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`
  };
}

export default {
  /* eslint-disable @typescript-eslint/camelcase */
  graphql_endpoint: `${process.env.VUE_APP_API_ENDPOINT}/graphql`,
  graphql_endpoint_iam_region: 'us-east-1',
  graphql_headers: getAuthToken,

  endpoints: [
    {
      name: 'Web',
      endpoint: process.env.VUE_APP_API_ENDPOINT,
      custom_header: getAuthToken
    }
  ]
};
