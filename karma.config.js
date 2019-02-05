const webpackConfig = require('./webpack.common');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

(function correctConfig() { 

   // Fix error with MiniCssExtractPlugin in karma
   webpackConfig.module.rules.forEach((rule) => { 
      if (!rule.use) return;

      const cssExtIndex = rule.use.indexOf(MiniCssExtractPlugin.loader);
      if (cssExtIndex == -1) return;
      
      rule.use[cssExtIndex] = 'style-loader';
   });

}());

module.exports = function (config) {
   config.set({
      basePath: '',
      frameworks: ['mocha', 'chai', 'sinon'],
      reporters: ['mocha'],
      files: ['src/**/*.spec.ts'],
      exclude: [],
      preprocessors: {
         'src/**/*.spec.ts': ['webpack'],
      },
      webpack: {
         mode: 'development',
         module: webpackConfig.module,
         resolve: webpackConfig.resolve,
      },
      webpackMiddleware: {
         noInfo: true,
         stats: 'errors-only'
      },
      mochaReporter: {
         showDiff: true,
      },
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      browsers: ['PhantomJS'],
      singleRun: false,
      concurrency: Infinity,
   });
}