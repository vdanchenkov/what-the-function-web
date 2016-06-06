var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.config.babel.js')

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    assets: true,
    version: false,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: true
  }
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    return console.log(err)
  }
  console.log('Listening at http://localhost:3000/')
})
