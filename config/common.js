const plugins = require('./plugins');
const output = require('./output');
const entry = require('./entry');
const rules = require('./rules');
const paths = require('./paths');

/*-------------------*/

module.exports = {
  entry: entry.common,

  output: output.prod,

  module: { rules: rules.common },

  plugins: plugins.common,

  optimization: {
    runtimeChunk: 'single',
  },

  resolve: { extensions: ['.ts', '.tsx', '.js'] },

  stats: 'minimal',

  cache: true,

  watchOptions: {
    ignored: /node_modules/,
  },

  devServer: {
    static: { directory: paths.devServerDir },
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 3000,
    client: { overlay: { errors: true, warnings: false } },
  },
};
