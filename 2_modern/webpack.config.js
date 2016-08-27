var path = require("path");
var helpersDir = path.join(__dirname, 'src', 'helpers');

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
        extensions: ['', '.jsx', '.js', '.es6', '.hbs', '.less'],
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.hbs/,
            loader: "handlebars-loader",
            query: {
                helperDirs: [helpersDir]
            }
        }, {
            test: /\.less$/,
            exclude: /node_modules/,
            loaders: ["style", "css", "postcss", "less"]
        }],
    },
    node: {
        fs: "empty" // avoids error messages
    },
    watchOptions: {poll: 600, aggregateTimeout: 300}
};