const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', './src/frontend/index.js'],
  devtool: 'source-map',
  devServer: {
    port: 9000,
    contentBase: path.join(__dirname, '/dist/frontend'),
    historyApiFallback: true,
  },
  output: {
    filename: 'front.js',
    path: path.resolve(__dirname, 'dist/frontend'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true, // true outputs JSX tags
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './template.html',
      filename: './index.html',
    }),
  ],
};
