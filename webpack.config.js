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
  entry: './web/src',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/client.js',
  },
  module: {
    rules: [
      // 编译js
      {
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            // 编译jsx
            presets: ['@babel/preset-react', '@babel/preset-env'],
          }
        }
      },
      // 编译sass、css，顺序从后往前
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
    // 清理dist文件夹
    // new Clean(),
    // 选择模版并且渲染html注入样式和脚本
    new Html({
      template: './index.html'
    }),
    // 改造css-loader
    new Extract({
      filename: 'css/client.css'
    })
  ],
  devServer: {
      port: 6001,
      open: true
  }
};