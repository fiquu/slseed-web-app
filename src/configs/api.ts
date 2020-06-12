import Auth from '@aws-amplify/auth';

const { VUE_APP_API_ENDPOINT } = process.env;

/**
 * @returns {object} The headers object with Cognito JWT auth token.
 */
async function getHeaders(): Promise<Record<string, string>> {
  const user = await Auth.currentAuthenticatedUser();

  return {
    Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`
  };
}

export default {
  graphql_endpoint: `${VUE_APP_API_ENDPOINT}/graphql`,
  graphql_endpoint_iam_region: 'us-east-1',
  graphql_headers: getHeaders,

  endpoints: [{
    endpoint: VUE_APP_API_ENDPOINT,
    custom_header: getHeaders,
    name: 'Web'
  }]
};
