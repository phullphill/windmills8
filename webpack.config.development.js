'use strict';

var webpack = require('webpack');
var baseConfig = require('./webpack.config.base');

var config = Object.create(baseConfig);

config.target = 'web';
config.devtool = 'source-map';
config.output.filename = 'bundle.js';

module.exports = config;
