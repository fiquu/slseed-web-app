const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  devServer: require('./dev-server'),
  devtool: 'source-map',
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.BUNDLE_ANALYZER || 'disabled',
      openAnalyzer: false
    })
  ]
};
