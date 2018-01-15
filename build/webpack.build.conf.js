const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');

const baseWebpackConfig = require('./webpack.base.conf');
const config = require('../config');
const utils = require('./utils');

const webpackConfig = {
  devtool: config.devtool,

  output: {
    chunkFilename: utils.assetsPath(path.join('scripts', '[id].[chunkhash].js')),
    filename: utils.assetsPath(path.join('scripts', '[name].[chunkhash].js')),
    path: config.assetsRoot
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: config.sourceMaps,
      compress: {
        warnings: true
      }
    }),

    new ExtractTextPlugin({
      filename: utils.assetsPath(path.join('styles', '[name].[contenthash].css'))
    }),

    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(path.join(__dirname, '..', 'node_modules')) === 0
        );
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      chunks: ['vendor'],
      name: 'manifest'
    }),

    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, path.join('..', 'static')),
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
};

if (config.bundleAnalyzerReport) {
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = merge(baseWebpackConfig, webpackConfig);
