/*eslint-disable */

var path = require('path');
var helpersDir = path.join(__dirname, 'src', 'helpers');
var autoprefixer = require('autoprefixer');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        './src/index.js',
        './users.less'
    ],
    output: {
        path: './dist',
        filename: 'index.bundle.js'
    },
    resolve: {
        extensions: ['', '.jsx', '.js', '.es6', '.hbs', '.less']
    },
    devServer: {
        hot: true,
        inline: true
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.hbs/,
            loader: 'handlebars-loader',
            query: {
                helperDirs: [helpersDir]
            }
        }, {
            test: /\.json/,
            loader: 'json-loader'
        }, {
            test: /\.md/,
            loader: 'markdown-loader'
        }, {
            test: /\.less$/,
            exclude: /node_modules/,
            loaders: ['style', 'css', 'postcss', 'less']
        }]
    },
    postcss: function () {
        return [autoprefixer({ browsers: ['last 2 versions'] })];
    },
    node: {
        fs: 'empty'
    },
    watchOptions: {poll: 600, aggregateTimeout: 300}
};
