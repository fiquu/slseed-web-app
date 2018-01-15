const eslintFriendlyFormatter = require('eslint-friendly-formatter');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const vueLoaderConfig = require('./vue-loader.conf');
const loadMinified = require('./load-minified');
const package = require('../package.json');
const config = require('../config');
const utils = require('./utils');

const resolve = dir => path.join(__dirname, '..', dir);

module.exports = {
  entry: {
    app: resolve(path.join('source', 'main.js'))
  },

  output: {
    publicPath: config.assetsPublicPath,
    path: config.assetsRoot,
    filename: '[name].js'
  },

  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: path.join('vue', 'dist', 'vue.esm.js'),
      '@': resolve('source')
    }
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.env
    }),

    new HtmlWebpackPlugin({
      template: path.join('source', 'index.pug'),
      filename: config.index,
      inject: true,

      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true
      },

      serviceWorkerLoader: loadMinified(path.join(__dirname, '..', 'source', 'service-worker.js')),
      chunksSortMode: 'dependency',
      env: config.env,
      package
    })
  ],

  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      },
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('source'), resolve('test')],
        options: {
          formatter: eslintFriendlyFormatter
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('source'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          name: utils.assetsPath(path.join('images', '[name].[hash:7].[ext]')),
          limit: 10000
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          name: utils.assetsPath(path.join('media', '[name].[hash:7].[ext]')),
          limit: 10000
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          name: utils.assetsPath(path.join('fonts', '[name].[hash:7].[ext]')),
          limit: 10000
        }
      }
    ].concat(
      utils.styleLoaders({
        sourceMap: config.sourceMaps,
        extract: config.extractCss
      })
    )
  }
};
