/**
 * Credit to Gbuomprisco for his webpack configs
 * https://github.com/Gbuomprisco/ng2-tag-input/blob/master/webpack.demo.js
 */

var path = require('path');
var webpack = require('webpack');

module.exports = {
  'entry': {
    'app': './demo/main.ts',
  },
  'output': {
    'path': './demo/dist',
    'publicPath': '/',
    'filename': '[name].js'
  },
  'resolve': {
    'extensions': [
      '',
      '.ts',
      '.js',
      '.json',
      '.css',
      '.scss',
      '.html',
    ]
  },
  'module': {
    'loaders': [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript'
      },
        {
          test: /\.html$/,
          loader: 'raw'
        }, {
          test: /\.scss$/,
          loaders: ['raw', 'postcss', 'sass']
        }
    ]
  },
  plugins: [
    /**
     * Fix https://github.com/angular/angular/issues/11580
     */
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      root('./lib') // location of your src
    )
  ]
};

function root(__path) {
  return path.join(__dirname, __path);
}
