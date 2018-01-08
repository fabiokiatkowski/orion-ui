const devConfig = require('./webpack.config.dev');

const HOT_SERVER_URL = '//localhost:3000';

devConfig.entry = {
  index: [`webpack-dev-server/client?http:${HOT_SERVER_URL}`, 'webpack/hot/only-dev-server', './test/functional/index']
};

module.exports = devConfig;
