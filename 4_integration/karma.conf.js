/*eslint-disable */

var webpack = require('webpack');

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai', 'jquery-2.1.0'],
        files: [
            './node_modules/babel-polyfill/dist/polyfill.js',
            'test/index.js'
        ],
        exclude: ['node_modules/'],
        preprocessors: {
            'test/index.js': ['webpack']
        },
        webpack: {
            devtool: 'inline-source-map',
            module: {
                loaders: [
                    {
                        test: /\.js$/,
                        loader: 'babel-loader'
                    },
                    {
                        test: /\.hbs$/,
                        loader: 'handlebars'
                    }
                ]
            }
        },
        reporters: ['progress', 'spec'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        browsers: ['PhantomJS'],
        concurrency: Infinity,
        webpackServer: {
            noInfo: true //please don't spam the console when running in karma!
        },
        plugins: [
            require('karma-mocha'),
            require('karma-chai'),
            require('karma-webpack'),
            require('karma-phantomjs-launcher'),
            require('karma-jquery'),
            require('karma-spec-reporter'),
        ]
    });
};
