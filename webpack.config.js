const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const merge = require('webpack-merge');
const validate = require('webpack-validator').validateRoot;

const parts = require('./libs/parts');

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
};

const common = {
    /*externals: {
        zepto: '$'
    },*/
    entry: {
        app: PATHS.app
    },
    output: {
        path: PATHS.build,
        filename: '[name].js',
        libraryTarget: 'umd',
    },
    /*resolve:{
        alias: { //路径需要用 path.resolve 处理下
            "zepto": path.resolve(__dirname, 'node_modules/zepto/dist/zepto.js')
        }
    },*/
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack demo'
        }),
        new webpack.ProvidePlugin({
            $: 'zepto',
        }),
        new CleanWebpackPlugin(['build'])
    ]
};

var config;

switch(process.env.npm_lifecycle_event) {
    case 'build':
        console.log(process.env.npm_lifecycle_event);
        config = merge(common,
            parts.setupCSS(PATHS.app),
            {
                devtool: 'source-map'
            });
        break;
    default:
        console.log(process.env.npm_lifecycle_event);
        config = merge(common,
            parts.setupCSS(PATHS.app),
            parts.devServer({
                host: process.env.Host,
                port: process.env.PORT
            }),
            {
                devtool: 'eval-source-map'
            });
}

// module.exports = validate(config);
module.exports = config;