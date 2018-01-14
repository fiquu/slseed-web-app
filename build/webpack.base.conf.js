const eslintFriendlyFormatter = require('eslint-friendly-formatter');
const path = require('path');

const vueLoaderConfig = require('./vue-loader.conf');
const config = require('../config');
const utils = require('./utils');

const resolve = dir => path.join(__dirname, '..', dir);

module.exports = {
  entry: {
    app: './source/main.js'
  },

  output: {
    publicPath: config.assetsPublicPath,
    path: config.assetsRoot,
    filename: '[name].js'
  },

  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve('source')
    }
  },

  module: {
    rules: [
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
          name: utils.assetsPath('images/[name].[hash:7].[ext]'),
          limit: 10000
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          name: utils.assetsPath('media/[name].[hash:7].[ext]'),
          limit: 10000
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
          limit: 10000
        }
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      }
    ]
  }
};
