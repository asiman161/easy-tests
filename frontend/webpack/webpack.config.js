'use strict';

const NODE_ENV = process.env.NODE_ENV,
  webpack = require('webpack'),
  path = require('path'),
  precss = require('precss'),
  autoprefixer = require('autoprefixer');

const rootPath = path.resolve(__dirname, '../..'),
  frontendPath = path.resolve(rootPath, 'frontend/src'),
  polyfillsPath = path.resolve(frontendPath, 'polyfills.ts'),
  vendorPath = path.resolve(frontendPath, 'vendor.ts'),
  appPath = path.resolve(frontendPath, 'main.ts'),
  outputPath = path.resolve(rootPath, 'public'),
  sassPath = path.resolve(frontendPath, 'styles'),
  sassResourcesPath = [
    path.resolve(sassPath, 'helpers/_variables.scss')
  ];


module.exports = {
  devtool: NODE_ENV != 'production' ? 'eval-source-map' : false,

  entry: {
    polyfills: polyfillsPath,
    vendor: vendorPath,
    app: appPath
  },

  output: {
    path: outputPath,
    filename: '[name].js'
  },

  devServer: {
    host: 'localhost',
    port: 8000,
    contentBase: outputPath,
    inline: true, //enable livereload
    historyApiFallback: {
      index: '/'
    },
    proxy: { // if need
      "/": {
        "target": 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  },

  resolve: {
    extensions: ['', '.js', '.ts']
  },

  watch: NODE_ENV != 'production',

  module: {
    preLoaders: [
      {test: /\.ts$/, loader: "tslint"}
    ],
    loaders: [
      {test: /\.ts$/, loader: 'ts'},
      {test: /\.html$/, loader: 'raw'},
      {test: /\.scss$/, loader: 'raw!postcss!sass!sass-resources'}
    ]
  },
  postcss: function () {
    return [precss, autoprefixer({browsers: ['last 2 version']})];
  },

  sassResources: sassResourcesPath,

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'polyfills']
    })
  ]
};

if (NODE_ENV == 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        unsafe: true
      }
    })
  );
}
