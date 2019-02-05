const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const htmlWebpackPluginBaseConfig = {
   favicon: "./src/img/favicon.png",
   minify: {
      collapseWhitespace: true,
      removeComments: true,
   },
}

module.exports = {
   mode: 'development',
   entry: {
      page1: './src/pages/page1/index.ts',
      page2: './src/pages/page2/index.ts',
      page3: './src/pages/page3/index.ts',
   },
   output: {
      filename: '[name]/app.[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
   },
   optimization: {
      splitChunks: {
         chunks: 'all'
      }
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
      new HtmlWebpackPlugin(merge(htmlWebpackPluginBaseConfig, {
         filename: 'page1/index.html',
         template: './src/pages/page1/index.pug',
         chunks: ['page1'],
      })),
      new HtmlWebpackPlugin(merge(htmlWebpackPluginBaseConfig, {
         filename: 'page2/index.html',
         template: './src/pages/page2/index.pug',
         chunks: ['page2'],
      })),
      new HtmlWebpackPlugin(merge(htmlWebpackPluginBaseConfig, {
         filename: 'page3/index.html',
         template: './src/pages/page3/index.pug',
         chunks: ['page3'],
      })),
      new webpack.HashedModuleIdsPlugin(),
      new MiniCssExtractPlugin({
         filename: "[name].[contenthash].css",
      }),
   ],

};
