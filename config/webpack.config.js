/**
 * Credit to Gbuomprisco for his webpack configs
 * https://github.com/Gbuomprisco/ng2-tag-input/blob/master/webpack.config.js
 */

var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');

// Webpack Config
module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    'vendor': ['@angular/core', '@angular/common', '@angular/forms'],
    'angular2-tag-input': './lib/tag-input.module.ts'
  },

  output: {
    chunkFilename: '[name].chunk.js',
    filename: '[name].bundle.js',
    library: 'angular2-tag-input',
    libraryTarget: 'umd',
    path: './dist',
    sourceMapFilename: '[name].map',
    umdNamedRequire: true
  },

  externals: {
    '@angular/core': true,
    '@angular/common': true,
    '@angular/forms': true
  },

  resolve: {
    extensions: ['', '.ts', '.js']
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          // these packages have problems with their sourcemaps
          path.join(__dirname, 'node_modules', 'rxjs'),
          path.join(__dirname, 'node_modules', '@angular')
        ]
      }
    ],
    loaders: [
      // .ts files for TypeScript
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.html$/,
        loader: 'raw'
      },
      {
        test: /\.scss$/,
        loaders: ['raw', 'postcss', 'sass']
      }
    ]
  },

  postcss: function () {
    return [autoprefixer];
  }
};
