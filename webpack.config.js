var webpack = require('webpack');

// 开发环境
var isDev = function() {
  return process.env.NODE_ENV === 'dev';
};

// 生产环节
var isProd = function() {
  return process.env.NODE_ENV === 'prod';
};

var plugins = [
  new webpack.DefinePlugin({
    __DEV__ : isDev(),
    __PROD__: isProd()
  }),
  new webpack.optimize.CommonsChunkPlugin('vendor', isProd() ? 'vendor.[hash:8].js' : 'vendor.js'),
  new ExtractTextPlugin(isProd() ? '[name].[hash:8].css' : '[name].css')
];

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
    })
  );
}

module.exports = {
  devtool: isProd() ? 'cheap-module-source-map' : 'cheap-module-eval-source-map',
  entry: {
    index: [
      './src/js/index.js'
    ],
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'react-redux',
      'redux'
    ]
  },
  output: {
    path: './dist',
    filename: isProd() ? '[name].[hash:8].js' : '[name].js',
    chunkFilename: isProd() ? '[name].[chunkhash:8].js' : '[name].chunk.js',
    publicPath: '/dist/'
  },
  module: {
    loaders: [{
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('sass?sourceMap')
    }]
  },
  plugins: plugins
};




