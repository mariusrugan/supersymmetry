var path = require('path')
var paths = require('./')
var webpack = require('webpack')
var webpackManifest = require('../lib/webpackManifest')
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

var reactExternal = {
    root: 'React',
    commonjs2: 'react',
    commonjs: 'react',
    amd: 'react'
};

module.exports = function (env) {
    var jsSrc = path.resolve(paths.sourceAssets + '/js/')
    var jsDest = paths.publicAssets + '/js/'
    var publicPath = 'assets/js/'

    var webpackConfig = {
        context: jsSrc,

        plugins: [
            new CommonsChunkPlugin('vendor', 'vendor.js', Infinity),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }),
            new webpack.optimize.OccurenceOrderPlugin()
        ],

        resolve: {
            extensions: ["", ".js", ".jsx", ".es6"]
        },

        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loaders: ['babel-loader?stage=1'],
                    exclude: /node_modules/
                },
                {
                    test: /\.cjsx$/,
                    loaders: ['react-hot', 'coffee', 'cjsx'],
                    exclude: /node_modules/
                },
                {
                    test: /\.coffee$/,
                    loaders: ['coffee'],
                    exclude: /node_modules/
                }
            ]
        }
    }

    if (env !== 'test') {
        // Karma doesn't need entry points or output settings
        webpackConfig.entry = {
            app: ['./app.js'],
            vendor: ['./vendor.js']
        }

        webpackConfig.output = {
            path: jsDest,
            filename: env === 'production' ? '[name]-[hash].js' : '[name].js',
            publicPath: publicPath
        }

        webpackConfig.externals = {
            'jquery': 'jQuery'
        }

        // Factor out common dependencies into a shared.js
        webpackConfig.plugins.push(
            new webpack.optimize.CommonsChunkPlugin({
                name: 'shared',
                filename: env === 'production' ? '[name]-[hash].js' : '[name].js',
            })
        )
    }

    if (env === 'development') {
        webpackConfig.devtool = 'source-map'
        webpack.debug = true
    }

    if (env === 'production') {
        webpackConfig.plugins.push(
            new webpackManifest(publicPath, 'public'),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin(),
            new webpack.NoErrorsPlugin()
        )
    }

    return webpackConfig
}
