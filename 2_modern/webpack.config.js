var path = require("path");
var helpersDir = path.join(__dirname,'src','helpers');
module.exports = {
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
        path: './dist',
        filename: 'index.bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.hbs/,
            loader: "handlebars-loader",
            query:{
                helperDirs:[helpersDir]
            }
        }],
    },
    resolve: {
        extensions: ['', '.jsx', '.js', '.es6', '.hbs', '.less'],
    },
    node: {
        fs: "empty" // avoids error messages
    },
    watchOptions: {poll: 600, aggregateTimeout: 300}
};