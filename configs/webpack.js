const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { IgnorePlugin } = require('webpack');

module.exports = {
  devServer: require('./dev-server'),
  devtool: false,
  plugins: [
    new IgnorePlugin(/^\.\/locale$/, /moment$/), // Don't load every Moment locale (many kbs!)
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.NODE_ENV === 'local' ? 'server' : 'disabled',
      openAnalyzer: false
    })
  ]
};
