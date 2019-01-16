const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: path.resolve(__dirname + '/src/Clock.vue'),
    output: {
        path: path.resolve(__dirname + '/dist/'),
        filename: 'vue-clock.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                include: __dirname,
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.css$/,
                loader: 'style!less!css'
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            sourceMap: false,
            mangle: true,
            compress: {
                warnings: false
            }
        }),
    ]
};