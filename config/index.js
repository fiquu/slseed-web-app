/**
 * Config main module.
 *
 * @module config/index
 */

const path = require('path');

const development = require('./development.env');
const production = require('./production.env');
const staging = require('./staging.env');
const local = require('./local.env');

const config = {
  index: path.resolve(__dirname, '../dist/index.html'),
  port: process.env.PORT,

  assetsRoot: path.resolve(__dirname, '../dist'),
  assetsSubDirectory: 'static',
  assetsPublicPath: '/',

  // productionGzipExtensions: ['js', 'css'],
  bundleAnalyzerReport: false,
  productionSourceMap: false,
  autoOpenBrowser: false,
  productionGzip: false,
  cssSourceMap: false,
  extractCss: true
};

switch (process.env.NODE_ENV) {
  case 'production':
    config.bundleAnalyzerReport = true;
    config.env = production;
    break;

  case 'development':
    config.env = development;
    break;

  case 'staging':
    config.env = staging;
    break;

  default:
    config.env = local;
    break;
}

module.exports = config;
