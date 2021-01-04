const internalIp = require('internal-ip');

const PORT = process.env.PORT || 8081;

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

module.exports = {
  clientLogLevel: 'debug',
  disableHostCheck: true, // Allow Gitpod previews
  compress: true,
  port: PORT,
  headers: {
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'same-origin',
    'Content-Language': 'en-US',
    'X-Frame-Options': 'DENY',
    'Feature-Policy': '',
    'Content-Security-Policy': generateCSP({
      'font-src': [CSP_SELF, CSP_DATA, 'https://fonts.gstatic.com'],
      'img-src': [CSP_SELF, CSP_DATA],
      'manifest-src': [CSP_SELF],
      'default-src': [CSP_SELF],
      'script-src': [CSP_SELF],
      'object-src': [CSP_NONE],
      'frame-src': [CSP_NONE],
      'base-uri': [CSP_SELF],
      'style-src': [
        CSP_SELF,
        CSP_UNSAFE_INLINE, // https://github.com/vuejs/vue-style-loader/issues/33
        'https://fonts.googleapis.com'
      ],
      'connect-src': [
        CSP_SELF,
        // Allow Cognito.
        'https://cognito-identity.us-east-1.amazonaws.com',
        'https://cognito-idp.us-east-1.amazonaws.com',
        // Allow local IP and port for HMR.
        `http://${internalIp.v4.sync()}:${PORT}`,
        `ws://${internalIp.v4.sync()}:${PORT}`,
        // Allow local API endpoint.
        'http://localhost:8080'
      ]
    })
  }
};
