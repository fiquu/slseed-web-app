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
    ...getHeader('Content-Language', 'en-US'),
    ...getHeader('X-Frame-Options', 'DENY'),
    ...getHeader('Feature-Policy', ''),
    ...getHeader('Content-Security-Policy', generateCSP({
      'style-src': [CSP_SELF, CSP_UNSAFE_INLINE, 'https://fonts.googleapis.com'],
      'font-src': [CSP_SELF, CSP_DATA, 'https://fonts.gstatic.com'],
      'img-src': [CSP_SELF, CSP_DATA],
      'manifest-src': [CSP_SELF],
      'default-src': [CSP_SELF],
      'script-src': [CSP_SELF],
      'object-src': [CSP_NONE],
      'frame-src': [CSP_NONE],
      'base-uri': [CSP_SELF],
      'connect-src': [
        CSP_SELF,
        'https://storage.googleapis.com/workbox-cdn/releases/', // For service worker
        'https://cognito-identity.us-east-1.amazonaws.com',
        'https://cognito-idp.us-east-1.amazonaws.com',
        // Allow API endpoint (must be set as origin custom headers in CloudFront).
        request.headers['x-env-api-endpoint'][0].value
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
