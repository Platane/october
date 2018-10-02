const path = require('path')
const ZipPlugin = require('zip-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const buildDir = path.resolve(__dirname, '../.build')

module.exports = {
  mode: 'production',
  target: 'node',
  node: {
    __dirname: false,
  },
  devtool: false,
  entry: { index: path.resolve(__dirname, '../src/index') },
  output: {
    filename: '[name].js',
    path: buildDir,
    libraryTarget: 'commonjs',
  },
  module: {
    rules: [
      {
        exclude: /node_modules\/(?!(@october)\/).*/,
        test: /\.(js)$/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin([buildDir]),
    new ZipPlugin({ filename: 'bundle.zip' }),
  ],
}
