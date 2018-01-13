const webpack = require('webpack');
const StatsPlugin = require('stats-webpack-plugin');

module.exports = (DEVELOPMENT) => {
  const entry = DEVELOPMENT ? [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
    './main.js'
  ] : './main.js';

  const plugins = DEVELOPMENT ? [
    new webpack.HotModuleReplacementPlugin()
  ] : [
    new StatsPlugin('stats.json')
  ];

  return {
    entry,
    output: {
      path: __dirname + '/app',
      filename: '[name].[hash].js'
    },
    plugins
  };
};