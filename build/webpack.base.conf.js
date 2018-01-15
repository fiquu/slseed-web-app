const eslintFriendlyFormatter = require('eslint-friendly-formatter');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const vueLoaderConfig = require('./vue-loader.conf');
const loadMinified = require('./load-minified');
const package = require('../package.json');
const slseed = require('../slseed.json');
const config = require('../config');
const cdn = require('../cdn.json');
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
      'process.env': config.env,
      slseed: config.slseed
    }),

    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'source', 'index.pug'),
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
      process,
      package,
      slseed,
      cdn
    }),

    new FaviconsWebpackPlugin({
      logo: config.appIconPath,
      prefix: path.join(config.assetsSubDirectory, 'icons', '[hash].', ''),
      background: slseed.background,
      version: package.version,
      title: slseed.title,
      icons: {
        appleStartup: false,
        appleIcon: false,
        opengraph: false,
        favicons: true,
        android: false,
        twitter: false,
        windows: false,
        yandex: false,
        coast: false
      }
    }),

    new WebpackPwaManifest({
      background_color: slseed.background,
      description: slseed.description,
      theme_color: slseed.color,
      short_name: slseed.short,
      version: package.version,
      display: slseed.display,
      name: slseed.title,
      start_url: '/',
      ios: true,
      icons: [
        {
          src: config.appIconPath,
          destination: path.join(config.assetsSubDirectory, 'icons'),
          sizes: [36, 48, 72, 96, 144, 192, 512]
        },
        {
          src: config.appIconPath,
          destination: path.join(config.assetsSubDirectory, 'icons'),
          sizes: [120, 152, 167, 180, 1024],
          ios: true
        }
      ]
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
