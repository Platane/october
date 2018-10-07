const fs = require('fs')
const url = require('url')
const path = require('path')
const http = require('http')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackAssetsManifest = require('webpack-assets-manifest')

const production = process.env.NODE_ENV === 'production'

const BLOBSTORE_SERVER_PORT = 8085

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
      app.use('/blobstore/*', async (req, res) => {
        const { originalUrl, method } = req
        const u = url.parse(originalUrl.split('/blobstore')[1] || '/')

        const proxy = http
          .request({ ...u, method, port: BLOBSTORE_SERVER_PORT }, proxyRes => {
            proxyRes.pipe(
              res,
              { end: true }
            )
          })
          .on(
            'error',
            err =>
              err.code === 'ECONNREFUSED' &&
              console.error(
                `could not find the blobstore server running on ${BLOBSTORE_SERVER_PORT}`
              )
          )

        req.pipe(
          proxy,
          { end: true }
        )
      }),
  },
}
