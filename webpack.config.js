const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: 'development',
  target: 'node',
  externals: [nodeExternals()],
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx$|\.js$/,
        exclude: /(node_modules)/,  //对这个不做处理
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env','@babel/react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'resource/[name].[ext]'   // 路径
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'resource/[name].[ext]'   // 路径
            }
          }
        ]
      },

    ]
  },
  plugins: [
    // 处理HTML文件
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        template: 'index.html'
    }),
    // 独立css文件
    new ExtractTextPlugin("css/[name].css")
  ],
  node: {
    fs: 'empty',
    net: 'empty'
  },
  devServer: {
    port: 8086
  }
};