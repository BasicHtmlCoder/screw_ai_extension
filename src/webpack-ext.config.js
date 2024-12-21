const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    lib: './main.js',
  },
  devtool: 'cheap-module-source-map',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../build')
  }
};