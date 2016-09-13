var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var copy = require('quickly-copy-file');
var del = require('del');

// 开发环境
var isDev = function() {
  return process.env.NODE_ENV.trim() === 'development';
};

// 生产环境
var isProd = function() {
  return process.env.NODE_ENV.trim() === 'production';
};

copyAndDelFiles();

module.exports = {
  devtool: isProd() ? false : 'inline-source-map',
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
      'nprogress'
    ]
  },
  output: {
    path: './dist',
    filename: isProd() ? '[name].[chunkhash:8].js' : '[name].js',
    chunkFilename: isProd() ? '[name].chunk.[chunkhash:8].js' : '[name].chunk.js',
    publicPath: isProd() ? './dist/' : '/dist/'
  },
  module: {
    loaders: [{
      test: /\.scss$/,
      exclude: /node_modules/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader', {
        publicPath: '.'
      })
    }, {
      test: /\.(png|jpg)$/,
      loader: 'file-loader?name=/[name].[hash:8].[ext]'
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015']
    }]
  },
  plugins: getPlugins()
};

// 复制和删除文件
function copyAndDelFiles() {
  var copyFile = '';

  // 复制文件
  if (isDev()) {
    copyFile = 'src/html/index_dev.html';
  } 

  if (isProd()) {
    copyFile = 'src/html/index.html';
  }

  copy(copyFile, 'index.html', function(error) {
    if (error) {
      return console.error(error);
    }
  });

  if (isProd()) {
    del(['dist']);
  }
}

// 获取配置
function getPlugins() {
  var plugins = [
    new webpack.DefinePlugin({
      __DEV__ : isDev(),
      __PROD__: isProd(),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV.trim())
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', isProd() ? 'vendor.[chunkhash:8].js' : 'vendor.js'),
    new ExtractTextPlugin(isProd() ? '[name].[chunkhash:8].css' : '[name].css'),
  ];

  if (isDev()) {
    plugins.push(
      new OpenBrowserPlugin({ url: 'http://localhost:8080/' })
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
      new HtmlWebpackPlugin({
        title: 'cobish - 写给未来的自己',
        filename: '../index.html',
        template: './src/html/index.html'
      }),
      new WebpackMd5Hash()
    );
  }

  return plugins
}