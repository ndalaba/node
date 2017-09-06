var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, '../server/public/build');
var APP_DIR = path.resolve(__dirname, 'app');

var config = {
    entry: {
        'polyfills': APP_DIR + '/polyfills.ts',
        // 'angular.vendor': APP_DIR + '/vendor.ts',
        'app': APP_DIR + '/main.ts'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        path: BUILD_DIR,
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: { configFileName: APP_DIR + '/tsconfig.json' }
                    }, 'angular2-template-loader'
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    }
};

module.exports = config;


