const path = require('path');

const config = require('./webpack.config');

module.exports = Object.assign(config, {
  mode: 'production',
  devtool: '',
  output: {
    path: path.resolve(__dirname, 'dist/'),
  },
});
