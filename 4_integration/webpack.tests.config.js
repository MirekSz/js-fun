module.exports = {
    entry: 'mocha!./test/index.js',
    output: {
        filename: 'test.build.js',
        path: './test/',
        publicPath: 'http://localhost:8002/test'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader']
            }
        ]
    },
    devServer: {
        host: 'localhost',
        port: '8002'
    }
};
