var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, './src/client/app/app.js'),
  output: {
    path: path.resolve(__dirname, './webpackpack'),
    filename: 'main.js',
  },
  devServer: {
    contentBase: path.join(__dirname, './webpackpack'),
    port: 9000
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        title: 'For the love of money',
        filename: 'index.html',
        template: './src/client/index.html'
      }
    )
  ],
  module: {
    loaders: [
      {
        test: /\.html$/, // Only .html files
        loader: 'html-loader' // Run html loader
      }
    ]
  }
};
