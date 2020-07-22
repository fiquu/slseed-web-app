'use strict';

const CSP_UNSAFE_INLINE = '\'unsafe-inline\'';
const CSP_NONE = '\'none\'';
const CSP_SELF = '\'self\'';
const CSP_DATA = 'data:';

/**
 * Generates a valid CSP policy header value from the policy object.
 *
 * @param {object} policy The policy as object.
 *
 * @returns {string} The policy as a header value string.
 */
function generateCSP (policy) {
  let csp = '';

  for (const key of Object.keys(policy)) {
    csp += `${key} ${policy[String(key)].join(' ')};`;
  }

  return csp;
}

/**
 * @param {string} key The header key.
 * @param {string} value The header value.
 *
 * @returns {object} The header object.
 */
function getHeader (key, value) {
  return {
    [key.toLowerCase()]: [{ key, value }]
  };
}

exports.handler = async event => {
  const { request, response } = event.Records[0].cf;
  const headers = {
    ...getHeader('Strict-Transport-Security', 'max-age=63072000; includeSubdomains; preload'),
    ...getHeader('X-Content-Type-Options', 'nosniff'),
    ...getHeader('X-XSS-Protection', '1; mode=block'),
    ...getHeader('Referrer-Policy', 'same-origin'),
    ...getHeader('Content-Language', 'en-US'), // Maybe make dynamic?
    ...getHeader('X-Frame-Options', 'DENY'),
    ...getHeader('Feature-Policy', ''),
    ...getHeader('Content-Security-Policy', generateCSP({
      'font-src': [CSP_SELF, CSP_DATA, 'https://fonts.gstatic.com'],
      'img-src': [CSP_SELF, CSP_DATA],
      'manifest-src': [CSP_SELF],
      'default-src': [CSP_SELF],
      'object-src': [CSP_NONE],
      'frame-src': [CSP_NONE],
      'base-uri': [CSP_SELF],
      'style-src': [
        CSP_SELF,
        CSP_UNSAFE_INLINE, // https://github.com/vuejs/vue-style-loader/issues/33
        'https://fonts.googleapis.com'
      ],
      'script-src': [
        CSP_SELF,
        // Allow service worker workbox plugin.
        'https://storage.googleapis.com'
        // Add other services here...
      ],
      'connect-src': [
        CSP_SELF,
        // Allow Cognito.
        'https://cognito-identity.us-east-1.amazonaws.com',
        'https://cognito-idp.us-east-1.amazonaws.com',
        // Allow API endpoint. Must be set as origin custom headers in CloudFront as Lambda@Edge does not support
        // environment varables.
        new URL(request.headers['x-env-api-endpoint'][0].value).origin
        // Add other services here...
      ]
    }))
  };

  return {
    ...response,
    headers: {
      ...response.headers,
      ...headers
    }
  };
};
