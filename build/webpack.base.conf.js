/**
 * Webpack base config build module.
 *
 * @module build/webpack.base.conf
 */
const eslintFriendlyFormatter = require('eslint-friendly-formatter');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const babel = require('babel-core');
const webpack = require('webpack');
const path = require('path');

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
      'process.app': config.app,
      'process.env': config.env
    }),

    new VueLoaderPlugin(),

    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'source', 'index.pug'),
      filename: config.index,
      inject: true,

      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true
      },

      chunksSortMode: 'dependency',
      env: process.env,
      package
    }),

    new CopyWebpackPlugin([
      {
        from: path.resolve(
          __dirname,
          path.join('..', 'source', 'service-worker', `${config.serviceWorker ? 'loader' : 'noop'}.js`)
        ),
        to: 'service-worker-loader.js',
        toType: 'file',
        cache: true,
        transform(content) {
          return babel.transform(content, {
            comments: false,
            minified: true,
            ast: false
          }).code;
        }
      }
    ]),

    new FaviconsWebpackPlugin({
      logo: config.appIconPath,
      prefix: path.join(config.assetsSubDirectory, 'icons', '[hash].', ''),
      background: package.app.background,
      version: package.version,
      title: package.app.name,
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
      background_color: package.app.background,
      description: package.app.description,
      theme_color: package.app.color,
      short_name: package.app.short,
      display: package.app.display,
      version: package.version,
      name: package.app.name,
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
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          transformToRequire: {
            image: 'xlink:href',
            source: 'source',
            video: 'source',
            img: 'source'
          }
        }
      },
      {
        test: /\.pug$/,
        loader: 'pug-plain-loader'
      },
      {
        test: /\.pug$/,
        oneOf: [
          {
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader']
          },
          {
            use: ['raw-loader', 'pug-plain-loader']
          }
        ]
      },
      {
        resourceQuery: /blockType=i18n/,
        loader: '@kazupon/vue-i18n-loader',
        type: 'javascript/auto'
      },
      {
        test: /\.(js|vue)$/,
        use: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('source'), resolve('test')]
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        },
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
      },
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
};
