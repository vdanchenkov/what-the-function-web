import * as config from 'react-project/webpack'
import merge from 'lodash/object/merge'

export const ClientConfig = merge({}, config.ClientConfig, {
  node: {
    fs: 'empty',
    module: 'empty',
    net: 'empty'
  },
  module: {
    noParse: [
      /babylon/
    ]
  },
  entry: {
    _vendor: [ 'lodash', 'babel-core', 'react-codemirror' ]
  }
})

export const ServerConfig = config.ServerConfig
