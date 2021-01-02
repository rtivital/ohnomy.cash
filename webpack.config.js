const path = require('path');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV;

const publicPath = '/';
const entry = path.join(__dirname, 'src/index.tsx');
const production = mode === 'production';
const hotEntries = [
  'webpack-dev-server/client?http://localhost:4002',
  'webpack/hot/only-dev-server',
  entry,
];

module.exports = {
  mode,
  devtool: production ? false : 'eval',
  entry: production ? entry : hotEntries,

  devServer: {
    port: 4002,
    compress: true,
    contentBase: path.join(__dirname, './dist'),
    publicPath,
    stats: { colors: true },
    hot: true,
    historyApiFallback: true,
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath,
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.(svg|png|jpg|gif|woff|woff2)$/,
        loader: 'file-loader',
      },
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(less)$/,
        use: [
          mode === 'production'
            ? {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath,
                },
              }
            : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[path][name]__[local]',
              },
            },
          },
          {
            loader: 'less-loader',
            options: {
              additionalData: "@import 'open-color/open-color.less';",
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new CaseSensitivePathsPlugin(),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(mode) }),
    new HtmlWebpackPlugin({
      templateContent: ({ htmlWebpackPlugin }) => `
      <!DOCTYPE html>
      <html>
        <head>
          ${htmlWebpackPlugin.tags.headTags}
          <meta charset="utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet">
          <link href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" rel="stylesheet">
        </head>
        <body>
          <noscript>
            Enable JavaScript to use application
          </noscript>
          <div id="app"></div>
          ${htmlWebpackPlugin.tags.bodyTags}
        </body>
      </html>
    `,
    }),
    ...(production
      ? [new MiniCssExtractPlugin({ filename: 'lib.css' })]
      : [
          new webpack.HotModuleReplacementPlugin(),
          new OpenBrowserPlugin({ url: 'http://localhost:4002' }),
        ]),
  ],
};
