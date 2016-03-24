var path = require('path');

module.exports = {
  'entry': {
    'angular2-tag-input': './src/tag-input.component.ts',
  },
  'output': {
    'path': './dist',
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
        test: /\.(sass|scss)$/,
        loader: 'to-string!css?sourceMap!sass?sourceMap'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.ts$/,
        loader: 'awesome-typescript',
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
    ]
  }
};
