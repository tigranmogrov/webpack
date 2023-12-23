const paths = require('./paths');
const path = require('path');
const IS_HASH = process.env.NODE_ENV === 'hash';
/*-------------------*/


module.exports = {

    prod: {
        filename: `assets/js/[name]${IS_HASH ? '.[contenthash]' : ''}.js`,
        path: paths.dist,
        assetModuleFilename: pathData => {
            const filepath = path.dirname(pathData.filename).split('/').slice(1).join('/');
            return `${filepath}/[name][ext]`;
        },
        asyncChunks: true,
        clean: true,
    }

};
