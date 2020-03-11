const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { DefinePlugin, IgnorePlugin } = require('webpack');

const { version } = require('../package.json');
const app = require('../app.json');

module.exports = {
  devServer: require('./dev-server'),
  devtool: false,
  plugins: [
    new IgnorePlugin(/^\.\/locale$/, /moment$/), // Don't load every Moment locale (many kbs!)
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.NODE_ENV === 'local' ? 'server' : 'disabled',
      openAnalyzer: false
    }),
    new DefinePlugin({
      'process.env': {
        VUE_APP_VERSION: `"${version}"`,
        VUE_APP_SHORT: `"${app.short}"`,
        VUE_APP_NAME: `"${app.name}"`
      }
    })
  ]
}
