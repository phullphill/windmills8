'use strict';

var path = require('path');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: { presets: ['es2015', 'stage-0', 'react']}
      },
    ]
  },
  output: {
    path: __dirname + '/dist'
  },
  resolve: {
    extensions: ['.js']
  }
};
