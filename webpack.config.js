const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const ImageminPlugin = require("imagemin-webpack");
const imageminPngquant = require("imagemin-pngquant");
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminGiflossy = require('imagemin-giflossy');
const imageminSvgo = require('imagemin-svgo');
const imageminWebp = require('imagemin-webp');


module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'img',
                        },
                    }
                ]
            }
        ]
    },
    devServer: {
        port: 9000
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/template/index.html.ejs',
            filename: 'index.html'
        }),
        new ImageminPlugin({
            bail: false, // Ignore errors on corrupted images
            cache: true,
            imageminOptions: {
                plugins: [
                    imageminPngquant(),
                    imageminMozjpeg(),
                    imageminGiflossy(),
                    imageminSvgo(),
                    imageminWebp()
                ]
            }
        })
    ]
};