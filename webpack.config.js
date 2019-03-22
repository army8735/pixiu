const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'cheap-source-map',
  entry: {
    'index': './src/index.js',
    'manual': './src/manual.js',
    'auto': './src/auto',
    'test': './src/test',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname),
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: true,
          },
        },
      },
    ],
  },
  plugins: [
  ],
};
