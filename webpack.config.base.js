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
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loaders:[
            'file?hash=sha512&digest=hex&name=assets/images/[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  },
  output: {
    path: __dirname + '/dist'
  },
  resolve: {
    extensions: ['', '.js']
  }
};
