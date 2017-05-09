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
     path.resolve(sassPath, 'helpers/_variables.scss'),
     path.resolve(sassPath, 'helpers/_mixins.scss')
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
    extensions: ['.js', '.ts']
  },

  module: {
    exprContextCritical: false,
    rules: [
      {
        enforce: 'pre',
        test: /\.ts$/,
        use: ['tslint-loader']
      }, {
        test: /\.ts$/,
        use: ['ts-loader', 'angular2-template-loader']
      }, {
        test: /\.html$/,
        use: ['raw-loader']
      }, {
        test: /\.scss$/,
        use: ['raw-loader', {
          loader: 'postcss-loader',
          options: {
            plugins: () => {
              return [precss, autoprefixer({browsers: ['last 2 version']})];
            }
          }
        }, 'sass-loader', {
          loader: 'sass-resources-loader',
          options: {
            resources: sassResourcesPath
          }
        }]
      }
    ]
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(NODE_ENV)
      }
    }),
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      frontendPath
    ),
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
        unsafe: true
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })
  );
}
