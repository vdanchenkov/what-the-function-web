//import * as config from 'react-project/webpack'
//import merge from 'lodash/object/merge'
//
//export const ClientConfig = merge({}, config.ClientConfig, {
//  node: {
//    fs: 'empty',
//    module: 'empty',
//    net: 'empty'
//  },
//  module: {
//    noParse: [
//      /babylon/
//    ]
//  },
//  entry: {
//    _vendor: [ 'lodash', 'babel-core', 'react-codemirror' ]
//  }
//})
//
//export const ServerConfig = config.ServerConfig


import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const prod = process.env.NODE_ENV === 'production'

module.exports = {
  devtool: prod ? 'source-map' : 'cheap-module-eval-source-map',
  entry: prod ? {
    app: './modules/client',
    babel: [ 'babel-core' ]
  } : [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './modules/client'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: prod ? 'bundle.[chunkhash].js' : 'bundle.js'
  },
  plugins: prod ? [
    new webpack.ProvidePlugin({ Glamor: 'glamor/react' }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'babel',
      minChunks: Infinity,
      filename: '[name].[chunkhash].js'
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      title: 'What The Function'
    })
  ] : [
    new webpack.ProvidePlugin({ Glamor: 'glamor/react' }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin()
  ],
  module: {
    noParse: [
      /babylon/
    ],
    /*
      fix of:

      WARNING in ./~/babel-core/lib/transformation/file/options/option-manager.js
      Critical dependencies:
      218:19-37 the request of a dependency is an expression
      411:21-39 the request of a dependency is an expression
      @ ./~/babel-core/lib/transformation/file/options/option-manager.js 218:19-37 411:21-39
    */
    exprContextRegExp: /$^/,
    exprContextCritical: false,
    loaders: [ {
      test: /\.js$/,
      loaders: [ 'babel' ],
      include: path.join(__dirname, 'modules')
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      loader: 'url-loader?limit=100000',
      test: /\.(gif|jpg|png|woff|woff2|eot|ttf|svg)$/
    } ]
  },
  node: {
    fs: 'empty',
    module: 'empty',
    net: 'empty'
  }
}
