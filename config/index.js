/**
 * Base config module.
 *
 * @module config/index
 */

const path = require('path');

const package = require('../package.json');
const slseed = require('../slseed.json');

module.exports = {
  index: path.resolve(__dirname, path.join('..', 'dist', 'index.html')),
  port: process.env.PORT,
  env: {
    PACKAGE_VERSION: package.version,
    PACKAGE_NAME: package.name,

    SLSEED_DOMAIN: slseed.title,
    SLSEED_GROUP: slseed.group,
    SLSEED_TITLE: slseed.title,
    SLSEED_NAME: slseed.name
  },

  appIconPath: path.resolve(__dirname, path.join('..', 'source', 'assets', 'icon.png')),
  assetsRoot: path.resolve(__dirname, path.join('..', 'dist')),
  assetsSubDirectory: 'static',
  assetsPublicPath: '/',

  bundleAnalyzerReport: false,
  autoOpenBrowser: false,
  sourceMaps: undefined,
  extractCss: true
};
