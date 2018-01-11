// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path');

const stagingEnv = require('./staging.env');
const localEnv = require('./local.env');
const prodEnv = require('./prod.env');
const devEnv = require('./dev.env');

/**
 * Stringify object key values for env assignment.
 */
function stringify(obj) {
  const out = {};

  Object.keys(obj).forEach(key => {
    out[key] = JSON.stringify(obj[key]);
  });

  return out;
}

const build = {
  index: path.resolve(__dirname, '../dist/index.html'),
  assetsRoot: path.resolve(__dirname, '../dist'),
  assetsSubDirectory: 'static',
  assetsPublicPath: '/',
  productionSourceMap: true,
  // Gzip off by default as many popular static hosts such as
  // Surge or Netlify already gzip all static assets for you.
  // Before setting to `true`, make sure to:
  // npm install --save-dev compression-webpack-plugin
  productionGzip: false,
  productionGzipExtensions: ['js', 'css'],
  // Run the build command with an extra argument to
  // View the bundle analyzer report after build finishes:
  // `npm run build --report`
  // Set to `true` or `false` to always turn it on or off
  bundleAnalyzerReport: process.env.npm_config_report
};

const dev = {
  env: stringify(localEnv),
  port: process.env.PORT,
  autoOpenBrowser: false,
  assetsSubDirectory: 'static',
  assetsPublicPath: '/',
  proxyTable: {},
  // CSS Sourcemaps off by default because relative paths are "buggy"
  // with this option, according to the CSS-Loader README
  // (https://github.com/webpack/css-loader#sourcemaps)
  // In our experience, they generally work as expected,
  // just be aware of this issue when enabling this option.
  cssSourceMap: false
};

switch (process.env.NODE_ENV) {
  case 'development':
    build.env = stringify(devEnv);
    break;

  case 'staging':
    build.env = stringify(stagingEnv);
    break;

  default:
    build.env = stringify(prodEnv);
    break;
}

module.exports = {
  build,
  dev
};
