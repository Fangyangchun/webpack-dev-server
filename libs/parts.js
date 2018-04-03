const webpack = require('webpack');

exports.devServer = function (options) {
    return {
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            stats: 'errors-only',
            host: options.host,
            port: options.port
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin({
                // multiStep: true
                multiStep: false
            })
        ]
    }
}

exports.setupCSS = function(paths) {
    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    loaders: ['style-loader', 'css-loader'],
                    include: paths
                },
                {
                    test: require.resolve('zepto'),
                    use: ['exports-loader?window.Zepto','script-loader']
                }
            ]

        }
    }
}
