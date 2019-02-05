const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
   mode: 'production',
   devtool: 'none',
   plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new CleanWebpackPlugin(['dist', 'webpack-analyze']),
      new BundleAnalyzerPlugin({
         analyzerMode: 'static',
         openAnalyzer: false,
         generateStatsFile: true,
         reportFilename: '../webpack-analyze/bundle-analyzer-report.html',
         statsFilename: '../webpack-analyze/stats.json',
      }),
   ]
});