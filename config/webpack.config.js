/**
 * Credit to Gbuomprisco for his webpack configs
 * https://github.com/Gbuomprisco/ng2-tag-input/blob/master/webpack.config.js
 */

const AotPlugin = require('@ngtools/webpack');
const webpack = require('webpack');

// Webpack Config
module.exports = {
  entry: {
    'vendor': ['@angular/core', '@angular/common', '@angular/forms'],
    'angular2-tag-input': './lib/tag-input.module.ts'
  },

  output: {
    filename: '[name].bundle.js',
    path: './dist-webpack'
  },

  resolve: {
    extensions: ['.ts', '.js', '.css', '.html']
  },

  module: {
    rules: [
      // .ts files for TypeScript
      {
        test: /\.ts$/,
        loader: '@ngtools/webpack'
      },
      {
        test: /\.(html|css)$/,
        loader: 'raw-loader'
      }
    ]
  },
  plugins: [
    new AotPlugin.AotPlugin({
      tsConfigPath: './tsconfig.json',
      entryModule: './lib/tag-input.module#RlTagInputModule'
    })
  ]
};
