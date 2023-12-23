const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/*-------------------*/

module.exports = {
  common: [
    {
      test: /\.html$/,
      include: [/parts/],
      type: 'asset/source',
    },
    {
      test: /\.ejs$/i,
      use: [
        {
          loader: 'html-loader',
          options: {
            minimize: {
              collapseWhitespace: true,
            },
          },
        },
        'template-ejs-loader',
      ],
    },
    {
      test: /\.js$/,
      // exclude: /node-modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                modules: false,
                useBuiltIns: false,
              },
            ],
          ],
          plugins: [
            '@babel/plugin-syntax-dynamic-import',
            ['@babel/plugin-proposal-class-properties', { loose: false }],
          ],
        },
      },
    },
    {
      test: /\.(jpe?g|png|gif|svg|ico)$/,
      exclude: [/fonts/, /node_modules/],
      type: 'asset/resource',
    },
    {
      test: /\.(woff2?|ttf|svg|otf|eot)$/,
      exclude: [/images/, /node_modules/],
      type: 'asset/resource',
    },
    {
      test: /\.(mp4|mp3)$/,
      exclude: /node_modules/,
      type: 'asset/resource',
    },
  ],

  dev: [
    {
      test: /\.(sa|sc|c)ss$/,
      exclude: [/fonts/],
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
            sourceMap: true,
          },
        },

        { loader: 'sass-loader', options: { sourceMap: true } },
      ],
    },
  ],

  prod: [
    {
      test: /\.(sa|sc|c)ss$/,
      exclude: [/fonts/],
      use: [
        MiniCssExtractPlugin.loader,

        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
          },
        },
        {
          loader: 'postcss-loader',

          options: {
            postcssOptions: {
              parser: 'postcss',
              plugins: ['postcss-normalize-charset', 'postcss-import', 'postcss-preset-env'],
            },
          },
        },

        { loader: 'sass-loader' },
      ],
    },
  ],
};
