module.exports = {
    devtool: 'source-map',
    entry:'./src/index.js',
    output: {
        path: './dist',
        filename: 'index.bundle.js'
    },
    module:{
        loaders:[{
            test:/\.js$/,
            exclude: /node_modules/,
            loader:'babel-loader'
        }],
    },
    resolve: {
        extensions: ['', '.jsx', '.js', '.es6', '.hbs', '.less'],
    },
    node: {
        fs: "empty" // avoids error messages
    },
    watchOptions:{poll:600,aggregateTimeout:300}
};