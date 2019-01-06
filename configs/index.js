/**
 * Main config.
 *
 * @module configs/index
 */

const internalIp = require('internal-ip');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 8081;

const NONCE = crypto.randomBytes(16).toString('base64');
const CSP_UNSAFE_INLINE = "'unsafe-inline'";
const CSP_NONE = "'none'";
const CSP_SELF = "'self'";
const CSP_DATA = 'data:';

function generateCSP(policy) {
  let csp = '';

  for (let key of Object.keys(policy)) {
    csp += `${key} ${policy[key].join(' ')};`;
  }

  return csp;
}

module.exports = {
  appIconPath: path.resolve(__dirname, path.join('..', 'public', 'static', 'images', 'icon.png')),
  sourceDir: path.resolve(__dirname, path.join('..', 'source')),
  outputDir: path.resolve(__dirname, path.join('..', 'dist')),
  iconsDir: path.join('static', 'icons'),
  devServer: {
    port: PORT,
    headers: {
      'strict-transport-security': 'max-age=31536000:includeSubDomains:preload',
      'x-content-type-options': 'nosniff',
      'x-xss-protection': '1;mode=block',
      'referrer-policy': 'same-origin',
      'x-frame-options': 'deny',
      'content-security-policy': generateCSP({
        'base-uri': [CSP_SELF],
        'script-src': [
          CSP_SELF,
          `'nonce-${NONCE}'`,
          'https://*.google.com',
          'https://*.gstatic.com',
          'https://*.facebook.net',
          'https://*.facebook.com'
        ],
        'img-src': [
          CSP_SELF,
          CSP_DATA,
          'https://*.cloudfront.net',
          'https://*.google.com',
          'https://*.googleapis.com',
          'https://*.gstatic.com',
          'https://*.facebook.com'
        ],
        'style-src': [CSP_SELF, CSP_UNSAFE_INLINE, 'https://*.googleapis.com'],
        'font-src': [CSP_SELF, CSP_DATA, 'https://*.gstatic.com'],
        'connect-src': [
          CSP_SELF,
          // Must allow local ip and port for HMR
          `http://${internalIp.v4.sync()}:${PORT}`,
          `ws://${internalIp.v4.sync()}:${PORT}`,
          'http://localhost:*'
        ],
        'frame-src': ['https://*.facebook.com', 'https://*.google.com'],
        'manifest-src': [CSP_SELF],
        'default-src': [CSP_SELF],
        'object-src': [CSP_NONE]
      })
    }
  }
};
