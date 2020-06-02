import Auth from '@aws-amplify/auth';

const { VUE_APP_API_ENDPOINT } = process.env;

/**
 * Resolves the Cognito JWT auth token.
 */
async function getAuthToken(): Promise<Record<string, string>> {
  const user = await Auth.currentAuthenticatedUser();

  return {
    Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`
  };
}

export default {
  graphql_endpoint: `${VUE_APP_API_ENDPOINT}/graphql`,
  graphql_endpoint_iam_region: 'us-east-1',
  graphql_headers: getAuthToken,

  endpoints: [{
    endpoint: VUE_APP_API_ENDPOINT,
    custom_header: getAuthToken,
    name: 'Web'
  }]
};
