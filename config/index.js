/**
 * Base config module.
 *
 * @module config/index
 */

const path = require('path');

module.exports = {
  index: path.resolve(__dirname, path.join('..', 'dist', 'index.html')),
  port: process.env.PORT,

  assetsRoot: path.resolve(__dirname, path.join('..', 'dist')),
  assetsSubDirectory: 'static',
  assetsPublicPath: '/',

  bundleAnalyzerReport: false,
  autoOpenBrowser: false,
  sourceMaps: undefined,
  extractCss: true
};
