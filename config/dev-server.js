const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('./webpack.dev.config.js');
const path = require('path');

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
  hot: true,
  historyApiFallback: true,
  // https: true,
  filename: config.output.filename,
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
    warnings: false
  }
});
console.log('server listening on local host?');
server.listen(3000, 'localhost');
