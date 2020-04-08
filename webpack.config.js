const path = require('path');
// const nodeExternals = require('webpack-node-externals');
// 构建css前的插件
const Extract = require('extract-text-webpack-plugin');
// 生成html并插入对应js、css
const Html = require('html-webpack-plugin');
// 清理dist文件夹
const { CleanWebpackPlugin: Clean } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    spa: './web/src',
    ssr: './index.js'
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name]_[hash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          }
        }
      },
      {
        test: /\.(css|scss)$/,
        loader: Extract.extract({
          use: ['css-loader', 'sass-loader']
        })
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
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'resource/[name].[ext]'   // 路径
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new Clean(),
    new Html({
      template: './index.html'
    }),
    new Extract({
      filename: 'css/[name]_[hash:8].css'
    })
  ],
  devServer: {
      port: 6001,
      open: true
  }
};