'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const getClientEnvironment = require('./env');
const paths = require('./paths');


const publicPath = '/';

const publicUrl = '';

const env = getClientEnvironment(publicUrl);
const extractLess = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
});

module.exports = {
  entry: [
    require.resolve('./polyfills'),
    require.resolve('react-dev-utils/webpackHotDevClient'),
    paths.appIndexJs,
  ],
  output: {
    pathinfo: true,
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: publicPath,
    devtoolModuleFilenameTemplate: info => path
      .resolve(info.absoluteResourcePath)
      .replace(/\\/g, '/')
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter,
              eslintPath: require.resolve('eslint')
            },
            loader: require.resolve('eslint-loader')
          }
        ],
        include: paths.appSrc
      }, {
        oneOf: [
          {
            test: [
              /\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/
            ],
            use: [
              {
                loader: require.resolve('url-loader'),
                options: {
                  limit: 10000,
                  name: 'static/media/[name].[hash:8].[ext]'
                }
              }

            ]
          },
          {
            test: /\.(js|jsx|mjs)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true
            }
          },
          {
            test: /\.css$/,
            use: [
              require.resolve('style-loader'), {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1
                }
              }, {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9', // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009'
                    })
                  ]
                }
              }
            ]
          }, {
            test: /\.less$/,
            use: extractLess.extract({
              use: [
                {
                  loader: require.resolve('css-loader')
                }, {
                  loader: require.resolve('less-loader')
                }
              ],
              // use style-loader in development
              fallback: require.resolve('style-loader')
            })
          },
          {
            exclude: [
              /\.js$/, /\.html$/, /\.json$/
            ],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]'
            }
          }
        ]
      },
    ]
  },
  plugins: [
    extractLess,
    new InterpolateHtmlPlugin(env.raw),
    new HtmlWebpackPlugin({inject: true, template: paths.appHtml}),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin(env.stringified),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
};
