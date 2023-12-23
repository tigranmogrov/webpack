const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const fs = require('fs');
const IS_HASH = process.env.NODE_ENV === 'hash';

/*-------------------*/

const DEFAULTS = { description: 'description', keywords: 'keywords' };

/*-------------------*/

/* Created methods HtmlWebpackPlugins */

const GetHtmlWebpackPlugins = (dir, ext, chunkName) => {

    const files = fs.readdirSync(path.resolve(__dirname, dir));

    const results = [];

    files.map(item => {
        const parts = item.split('.');
        const name = parts[0];
        const extension = parts[1];
        if (!extension || !name) return;
        const filename = `${dir}/${name}.${ext === 'ejs' ? 'html' : ext}`;
        const options = {
            filename: filename.replace('../src/', ''),
            template: path.resolve(__dirname, `${dir}/${name}.${ext}`),
            hash: false,
            chunks: [`${name}`,'main'] ,
            inject: 'body',
            scriptLoading: 'blocking',
            minify: {
                collapseWhitespace: true,
            },
        };
        if (chunkName) {
            options.chunks = chunkName.split(' ');
        }
        options.excludeChunks = ['assets', 'parts'];

        results.push(new HtmlWebpackPlugin({ ...DEFAULTS, ...options }));
    });

    return results;

};

/*-------------------*/

/* Watches all Html files in this folder */

const indexChunk = GetHtmlWebpackPlugins('../src', 'html');

const allHtmlChunk = [...indexChunk,];

/*-------------------*/

module.exports = {

    common: [
        ...allHtmlChunk,
        new MiniCssExtractPlugin({ filename: `assets/styles/[name]${IS_HASH ? '.[contenthash]' : ''}.css`, }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/assets/images', to: 'assets/images/' },
            ],
        }),
    ],

    dev: [],

    prod: [],

    minimizer: [
        new CssMinimizerPlugin({
            minimizerOptions: {
                preset: [
                    'default',
                    {
                        discardComments: { removeAll: true },
                    },
                ],
            },
        }),
        new TerserPlugin({
            extractComments: false,
            minify: TerserPlugin.uglifyJsMinify,
            terserOptions: {
                compress: {
                    pure_funcs: ['console.log'],
                },
            },
        })
    ]

};
