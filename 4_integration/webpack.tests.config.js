module.exports = {
    devtool: 'source-map',
    entry: ['babel-polyfill', 'stack-source-map/register','./test/index.js'],
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
        ],
        noParse: [
            /node_modules\/sinon\//
        ]
    },
    devServer: {
        host: 'localhost',
        port: '8002'
    }
};

