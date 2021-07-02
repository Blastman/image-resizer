'use strict';

const fs = require('fs');
const path = require('path');

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(item => ['.bin'].indexOf(item) === -1 )  // exclude the .bin folder
  .forEach((mod) => {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  node: {
    __dirname: false,
    __filename: false
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json']
  },
  devtool: 'source-map',
  plugins: [],
  module: {
    rules: [
      // {
      //   test: /\.node$/,
      //   loaders: ['node-loader']
      // }
    ]
  },
  externals: nodeModules
};
