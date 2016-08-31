const path = require('path')
const webpack = require('webpack')
const loaders = require('./loaders')
const vendor = require('./vendor')

module.exports = {
  entry: {
    app: [path.join(__dirname, '../src/app.tsx')],
    vendor
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, '../dist')
  },
  module: {
    loaders
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js', Infinity),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ]
}