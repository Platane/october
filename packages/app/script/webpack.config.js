const fs = require('fs')
const url = require('url')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackAssetsManifest = require('webpack-assets-manifest')
const lambdaExec = require('@october/blobstore-aws-dynamodb/script/lambdaExec')

const blobstoreExec = lambdaExec(
  path.resolve(__dirname, '../../blobstore-aws-dynamodb/src/index.js')
)

const production = process.env.NODE_ENV === 'production'

module.exports = {
  entry: {
    index: path.join(__dirname, '../src/index.js'),
  },

  output: {
    path: path.join(__dirname, '../dist'),
    filename: production ? '[name]-[hash:8].js' : '[name].js',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },

      {
        test: [/\.bmp/, /\.gif/, /\.jpe?g/, /\.png/, /\.otf/, /\.svg/],
        loader: 'file-loader',
        options: {
          name: production ? '[hash:8].[ext]' : '[name].[hash:8].[ext]',
        },
      },
    ],
  },

  plugins: [
    new WebpackAssetsManifest({
      output: path.resolve(__dirname, '../dist', 'assetManifest.json'),
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      hash: true,
    }),
  ],

  devtool: production ? 'source-map' : false,

  devServer: {
    port: 8083,
    historyApiFallback: true,
    watchOptions: {
      ignored: /node_modules/,
    },
    before: app =>
      app.get('/blobstore/*', async (req, res) =>
        res.end(
          await blobstoreExec(
            url.parse(req.url.split('/blobstore')[1] || ''),
            req.method
          )
        )
      ),
  },
}
