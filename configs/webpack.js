const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { IgnorePlugin } = require('webpack');

module.exports = {
  devServer: require('./dev-server'),
  devtool: 'source-map',
  plugins: [
    new IgnorePlugin(/^\.\/locale$/, /moment$/), // Don't load every Moment locale (many kbs!).
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.BUNDLE_ANALYZER || 'disabled',
      openAnalyzer: false
    })
  ]
};
