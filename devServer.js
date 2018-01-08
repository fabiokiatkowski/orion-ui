const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const CONFIG_FILE = process.env.WEBPACK_CONFIG || 'webpack.config.dev';
const config = require(`./${CONFIG_FILE}`); // eslint-disable-line

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  headers: {
    'Service-Worker-Allowed': '/'
  },
  historyApiFallback: true,
  // It suppress error shown in console, so it has to be set to false.
  quiet: false,
  // It suppress everything except error, so it has to be set to false as well
  // to see success build.
  noInfo: false,
  stats: {
    // Config for minimal console.log mess.
    assets: false,
    colors: true,
    version: false,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false
  }
}).listen(3000, 'localhost', (err) => {
  if (err) {
    console.log(err); // eslint-disable-line
  }
  console.log('Listening at localhost:3000'); // eslint-disable-line
});
