module.exports = {
    devtool: 'inline-source-map',
    entry: ['babel-polyfill','mocha!./test/index.js'],
    output: {
        filename: 'test.build.js',
        path: './test/',
        publicPath: 'http://localhost:8002/test'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                 exclude: /node_modules/
},
            {
                test: /\.hbs$/,
                loader: 'handlebars'
            }
        ]
    },
    devServer: {
        host: 'localhost',
        port: '8002'
    }
};
