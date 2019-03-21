const path = require('path');

const config = require('./webpack.config');

module.exports = Object.assign(config, {
  mode: 'production',
  entry: {
    'index': './src/index.js',
    'manual': './src/manual.js',
    'auto': './src/auto',
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
  },
});
