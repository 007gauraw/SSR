/* eslint-disable import/no-commonjs */

const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = [
  {
    mode: 'development',
    entry: ['@babel/polyfill', './src/server.js'],
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'server.js',
      libraryTarget: 'commonjs2',
      publicPath: '/',
    },
    target: 'node',
    node: {
      console: false,
      global: false,
      process: false,
      Buffer: false,
      __filename: false,
      __dirname: false,
    },
    externals: nodeExternals(),
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
            },
          ],
        },
        {
          test: /\.scss$/,
          loader: 'css-loader'
        },
        {
          test: /\.(ttf|eot|otf|svg|png)$/,
          loader: 'file-loader?emitFile=false'
        },
        {
          test: /\.(woff|woff2)$/,
          loader: 'url-loader?emitFile=false'
        },
      ],
    },
  },
  {
    mode: 'development',
    entry: ['@babel/polyfill', './src/app/browser.js'],
    output: {
      path: path.join(__dirname, 'dist/assets'),
      publicPath: '/',
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
            },
          ],
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
        },
        {
          test: /\.(ttf|eot|otf|svg|png)$/,
          loader: 'file-loader'
        },
        {
          test: /\.(woff|woff2)$/,
          loader: 'url-loader'
        }
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
  },
];
