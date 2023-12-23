const {merge} = require('webpack-merge');

/*-------------------*/

const plugins = require('./plugins');
const common = require('./common');
const entry = require('./entry');
const rules = require('./rules');

/*-------------------*/

module.exports = merge(common, {

    mode: 'development',

    module: { rules: rules.dev },

    devtool: 'source-map',

    plugins: plugins.dev,

});
