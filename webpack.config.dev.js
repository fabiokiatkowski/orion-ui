const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const EncodingPlugin = require('webpack-encoding-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

const HOT_SERVER_URL = '//localhost:3000';

const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  SRC: path.resolve(__dirname, 'src'),
  JS: path.resolve(__dirname, 'src/js'),
};

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [`webpack-dev-server/client?http:${HOT_SERVER_URL}`, 'webpack/hot/only-dev-server', path.join(paths.JS, 'app.js')],
  output: {
    path: paths.DIST,
    filename: '[name].js',
    publicPath: `${HOT_SERVER_URL}/`
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.SRC, 'index.html'),
    }),
    new ExtractTextPlugin('style.bundle.css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new EncodingPlugin({
      encoding: 'utf-8'
    }),
    new WriteFilePlugin({ log: false }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: ['style-loader', 'css-loader'] },
      {
        test: /\.(ttf|eot|svg|woff|woff(2)|png|jpg|jpeg|gif?)(\?[a-z0-9=&.]+)?$/,
        loader: ['file-loader?name=./[hash].[ext]']
      }
    ]
  },
};

