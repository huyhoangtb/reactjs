var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public/resources/js'),
        filename: 'app.bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, 'src/components'),
                loader: ExtractTextPlugin.extract('css-loader!sass-loader')
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: (getPath) => {
                return getPath('css/[name].css').replace('css/js', 'css');
            },
            allChunks: true
        }),
    ],
    stats: {
        colors: true
    },
    devtool: 'source-map'
};