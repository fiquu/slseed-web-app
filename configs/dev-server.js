/**
 * Main config.
 *
 * @module configs/index
 */

const internalIp = require('internal-ip');
const crypto = require('crypto');

const PORT = process.env.PORT || 8081;

const NONCE = crypto.randomBytes(16).toString('base64');
const CSP_UNSAFE_INLINE = "'unsafe-inline'";
const CSP_NONE = "'none'";
const CSP_SELF = "'self'";
const CSP_DATA = 'data:';

/**
 * Generates a valid CSP policy header value from the policy object.
 *
 * @param {Object} policy The policy as object.
 *
 * @returns {String} The policy as a header value string.
 */
function generateCSP (policy) {
  let csp = '';

  for (let key of Object.keys(policy)) {
    csp += `${key} ${policy[key].join(' ')};`;
  }

  return csp;
}

module.exports = {
  port: PORT,
  headers: {
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'same-origin',
    'Content-Language': 'en-US',
    'Feature-Policy': '',
    'X-Frame-Options': 'deny',
    'Content-Security-Policy': generateCSP({
      'script-src': [CSP_SELF, `'nonce-${NONCE}'`],
      'style-src': [CSP_SELF, CSP_UNSAFE_INLINE, 'https://fonts.googleapis.com'],
      'font-src': [CSP_SELF, CSP_DATA, 'https://fonts.gstatic.com'],
      'img-src': [CSP_SELF, CSP_DATA],
      'manifest-src': [CSP_SELF],
      'default-src': [CSP_SELF],
      'object-src': [CSP_NONE],
      'frame-src': [CSP_NONE],
      'base-uri': [CSP_SELF],
      'connect-src': [
        CSP_SELF,
        // Allow local IP and port for HMR
        `http://${internalIp.v4.sync()}:${PORT}`,
        `ws://${internalIp.v4.sync()}:${PORT}`,
        'https://*.amazonaws.com',
        // Allow local API server
        'http://localhost:8080'
      ]
    })
  }
};
