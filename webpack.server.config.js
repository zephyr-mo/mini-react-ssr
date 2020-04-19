const path = require('path');
// exclude node
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  entry: {
    ssr: ['./server'], // 入口文件
  },
  target: 'node',
  externals: [ new nodeExternals() ],
  devtool: 'source-map',
  output: {
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/server.js',
  },
  module: {
    rules: [
      // 编译js
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            // 编译jsx
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      // 编译sass、css，顺序从后往前
      {
        test: /\.(css|scss)$/,
        use: ['ignore-loader']
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
  devServer: {
      port: 6001,
      open: true
  }
};