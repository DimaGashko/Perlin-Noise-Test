const webpack = require('webpack');
const path = require('path');

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
   mode: 'development',
   entry: {
      app: './src/index.ts',
   },
   output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      //publicPath: '/',
   },
   module: {
      rules: [{
         test: /\.ts$/,
         use: [{
            loader: 'ts-loader',
            options: {
               transpileOnly: true,
               experimentalWatchApi: true,
            },
         }],
         exclude: /node_modules/
      }, {
         test: /\.pug/,
         loaders: ['html-loader', 'pug-html-loader'],
      }, {
         test: /\.(sass|css)$/,
         use: [
            MiniCssExtractPlugin.loader, //'style-loader',
            'css-loader',
            {
               loader: 'postcss-loader',
               options: {
                  plugins: [
                     autoprefixer({
                        browsers: ['last 3 version']
                     }),
                     cssnano(),
                  ],
                  sourceMap: true
               }
            },
            {
               loader: 'sass-loader',
               options: {
                  sourceMap: true,
               }
            }
         ]
      }, {
         test: /\.(gif|png|jpe?g|svg|webp)$/i,
         use: [{
            loader: 'file-loader',
            options: {
               outputPath: 'img',
            },
         }, {
            loader: 'image-webpack-loader',
            options: {
               mozjpeg: {
                  progressive: true,
                  quality: 65
               },
               pngquant: {
                  quality: '65-90',
                  speed: 4
               },
            }
         }],
      }],
   },
   resolve: {
      extensions: ['.tsx', '.ts', '.js']
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: './src/templates/index.pug',
         favicon: "./src/img/favicon.png",
         minify: {
            collapseWhitespace: true,
            removeComments: true,
         },

         inlineSource: '.(js|css)$'
      }),
      new webpack.HashedModuleIdsPlugin(),
      new MiniCssExtractPlugin({
         filename: "[name].[contenthash].css",
      }),
   ],

};
