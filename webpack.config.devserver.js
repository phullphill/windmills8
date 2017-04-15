/**
 * This file is only used for webpack-dev-server. 
 */

var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.join(__dirname, './'),
    entry: {
        js: './src/index.js'
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loaders: [
                    'style',
                    'css',
                    'sass'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: [
                    'react-hot',
                    'babel-loader'
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                loaders:[
                    'file?hash=sha512&digest=hex&name=assets/images/[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ],
    },
    resolve: {
        alias: {
            assets: path.resolve('./src/assets'),
            components: path.resolve('./src/components'),
            utils: path.resolve('./src/utils'),
            hocs: path.resolve('./src/hocs')
        },
        extensions: ['', '.js']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html', // Move the index.html file...
            inject: true // inject all files that are generated by webpack, e.g. bundle.js, style.css with the correct HTML tags
        }),
    ],
    devTool: 'source-map',
    devServer: {
        contentBase: './lib',
        hot: true
    }
};