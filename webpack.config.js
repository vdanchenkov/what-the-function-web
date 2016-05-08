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

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './modules/client'
  ],
  output: {
    path: path.join(__dirname, '.build'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
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
      test: /\.css$/,
      loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    } ]
  },
  node: {
    fs: 'empty',
    module: 'empty',
    net: 'empty'
  }
}
