const path = require('path');
// const basedir = path.join(__dirname, '../../client');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssConfiguration = path.resolve(__dirname, "src/configs");
const PATHS = {
    app: path.join(__dirname, 'src'),
    build: path.join(__dirname, "public/resources/js")
};

module.exports = {

    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.css'],
        modules: [path.resolve(__dirname, "src"), 'node_modules'],
        alias: {
            config: path.join(PATHS.app, 'config', 'configuration.js'),
            cssConfiguration,
        },
        mainFiles: ["index"]
    },

    entry: {
        app: [path.join(PATHS.app, 'index.js')],
        commons: ["react", "redux", "react-redux", "webpack-dev-server/client?http://localhost:80", "webpack/hot/only-dev-server", "./src/index.js"],
    },
    output: {
        path: path.join(PATHS.build),
        publicPath: '/public/resources/js/',
        filename: "[name].js",
        chunkFilename: "chunks/js/[id].js",
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react', "stage-0"],
                    cacheDirectory: false // TODO: only on development
                }
            },
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract('css-loader!sass-loader')
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"}
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "commons",
            filename: "commons.js"
        }),
        new ExtractTextPlugin({
            filename: (getPath) => {
                return getPath('css/[name].css').replace('css/js', 'css');
            },
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        // removes a lot of debugging code in React
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         'NODE_ENV': JSON.stringify('production')
        //     }
        // }),
        // // keeps hashes consistent between compilations
        // new webpack.optimize.OccurrenceOrderPlugin(),
        // // minifies your code
        // new webpack.optimize.UglifyJsPlugin({
        //     compressor: {
        //         warnings: false
        //     }
        // })

    ],
    stats: {
        colors: true
    },
    devtool: 'source-map',
    devServer: {
        historyApiFallback: true,
        hot: true,
        contentBase : "./"
    }
};