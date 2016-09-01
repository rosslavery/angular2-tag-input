var path = require('path');

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
      }
    ]
  }
};
