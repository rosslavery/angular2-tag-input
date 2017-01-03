var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    app: './demo/main.ts',
  },
  output: {
    path: root('/demo/dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  resolve: {
    extensions: [
      '.ts',
      '.js',
      '.json',
      '.css',
      '.scss',
      '.html',
    ]
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      }
    ]
  }
};

function root(__path) {
  return path.join(__dirname, __path);
}
