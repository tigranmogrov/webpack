const { merge } = require('webpack-merge');

/*-------------------*/

const plugins = require('./plugins');
const common = require('./common');
const rules = require('./rules');

/*-------------------*/

module.exports = merge(common, {
  mode: 'production',

  module: { rules: rules.prod },

  plugins: plugins.prod,

  optimization: { minimize: true, nodeEnv: 'production', minimizer: plugins.minimizer },

  performance: {
    hints: 'warning',
    maxEntrypointSize: 600000,
    maxAssetSize: 300000,
  },
});
