/**
 * Credit to Gbuomprisco for his webpack configs
 * https://github.com/Gbuomprisco/ng2-tag-input/blob/master/webpack.demo.js
 */

const path = require('path');
const webpack = require('webpack');

module.exports = {
  'entry': {
    'app': './demo/main.ts',
  },
  'output': {
    'path': '/demo/dist',
    'publicPath': '/',
    'filename': '[name].js'
  },
  'resolve': {
    'extensions': [
      '.ts',
      '.js',
      '.json',
      '.css',
      '.scss',
      '.html'
    ]
  },
  'module': {
    'rules': [
      {
        test: /\.ts$/,
        loaders: [
          'ts-loader',
          'angular2-template-loader'
        ]
      },
      {
        test: /\.(html|css)$/,
        loader: 'raw-loader'
      }, {
        test: /\.scss$/,
        loaders: ['raw-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      test: /\.ts$/,
      options: {
        resolve: {}
      }
    })
  ]
};

function root(__path) {
  return path.join(__dirname, __path);
}
