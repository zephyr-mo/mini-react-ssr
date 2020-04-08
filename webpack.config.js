const path = require('path');
const nodeExternals = require('webpack-node-externals');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', './index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-react', { modules: false }], ['@babel/preset-env', { modules: false }]],
          }
        }
      },
      {
        test: /\.css$/,
        use: {
          loader: 'css-loader'
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader:'style-loader',
            options: {
              injectType: 'linkTag',
            },
          },
          {loader: 'css-loader'},
         
          {
            loader: 'sass-loader',
            // options: {
            //   implementation: require('sass'),
            //   sassOptions: {
            //     fiber: false,
            //   },
            // },
          },
        ],
      },
      {
        test: /\.less$/i,
        use: [
          {
            loader:'style-loader',
            options: {
              injectType: 'linkTag',
            },
          },
          {loader: 'css-loader'},
          {
            loader: 'less-loader',
            // options: {
            //   implementation: require('less'),
            // },
          },
        ],
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          // options: {
          //   attrs: [':data-src']
          // }
        }
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
              limit: 8192,
              name: 'resource/[name].[ext]'   // 路径
            }
          }
        ]
      }
    ]
  },
  //   plugins: [
  //     new ExtractTextPlugin("css/[name].css")
  //   ],
  target: 'node',
  externals: [nodeExternals()],
  devServer: {
    port: 6001
  }
};