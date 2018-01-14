const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');

const baseWebpackConfig = require('./webpack.base.conf');
const loadMinified = require('./load-minified');
const package = require('../package.json');
const config = require('../config');
const utils = require('./utils');

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.productionSourceMap,
      extract: true
    }),

    loaders: [
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      }
    ]
  },

  devtool: config.productionSourceMap ? '#source-map' : false,

  output: {
    chunkFilename: utils.assetsPath('scripts/[id].[chunkhash].js'),
    filename: utils.assetsPath('scripts/[name].[chunkhash].js'),
    path: config.assetsRoot
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.env
    }),

    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),

    new ExtractTextPlugin({
      filename: utils.assetsPath('styles/[name].[contenthash].css')
    }),

    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),

    new HtmlWebpackPlugin({
      template: 'source/index.pug',
      filename: config.index,
      inject: true,
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true
      },

      serviceWorkerLoader: loadMinified(path.join(__dirname, '../source/service-worker.js')),
      chunksSortMode: 'dependency',
      env: config.env,
      package
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0
        );
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      chunks: ['vendor'],
      name: 'manifest'
    }),

    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),

    new SWPrecacheWebpackPlugin({
      staticFileGlobs: ['dist/**/*.{js,html,css}'],
      filename: 'service-worker.js',
      stripPrefix: 'dist/',
      cacheId: 'vue-pwa',
      minify: true
    })
  ]
});

if (config.bundleAnalyzerReport) {
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
