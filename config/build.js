const { merge } = require('webpack-merge');

/*-------------------*/

const plugins = require('./plugins');
const common = require('./common');
const rules = require('./rules');

/*-------------------*/

module.exports = merge(common, {
  mode: 'none',

  module: { rules: rules.prod },

  plugins: plugins.prod,
});
