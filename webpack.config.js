var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var ExtractTextPlugin = require("extract-text-webpack-plugin");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');

// 开发环境
var isDev = function() {
  return process.env.NODE_ENV === 'development';
};

// 生产环境
var isProd = function() {
  return process.env.NODE_ENV === 'production';
};

var plugins = [
  new webpack.DefinePlugin({
    __DEV__ : isDev(),
    __PROD__: isProd(),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  new webpack.optimize.CommonsChunkPlugin('vendor', isProd() ? 'vendor.[chunkhash:8].js' : 'vendor.js'),
  // new ExtractTextPlugin(isProd() ? '[name].[chunkhash:8].css' : '[name].css'),
  new HtmlWebpackPlugin({
    title: 'cobish - 写给未来的自己',
    filename: '../index.html',
    template: './src/html/index.html'
  })
];

if (isDev()) {
  plugins.push(
    new OpenBrowserPlugin({ url: 'http://localhost:8080/src/html/index_dev.html' })
  );
}

if (isProd()) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      output: {
        comments: false,
      },
      compress: {
        warnings: false
      }
    }),
    new WebpackMd5Hash()
  );
}

module.exports = {
  devtool: isProd() ? null : 'inline-source-map',
  entry: {
    index: [
      './src/js/index.js'
    ],
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'react-redux',
      'redux',
      'redux-thunk',
      'isomorphic-fetch',
      'nprogress'
    ]
  },
  output: {
    path: './dist',
    filename: isProd() ? '[name].[chunkhash:8].js' : '[name].js',
    chunkFilename: isProd() ? '[name].[chunkhash:8].js' : '[name].chunk.js',
    publicPath: isProd() ? './dist/' : '/dist/'
  },
  module: {
    loaders: [{
      test: /\.scss$/,
      exclude: /node_modules/,
      // loader: ExtractTextPlugin.extract('sass?sourceMap')
      loaders: ['style', 'css', 'sass']
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015']
    }]
  },
  plugins: plugins
};




