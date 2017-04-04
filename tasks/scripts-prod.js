'use strict'

const $                  = require('gulp-load-plugins')();
const gulp               = require('gulp');
const webpack            = require('webpack');
const AssetsPlugin       = require('assets-webpack-plugin');
const path               = require('path');
const gulplog            = require('gulplog');
const notifier           = require('node-notifier');
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = function(options) {
  return function(callback) {
    let options = {
      entry: {
        build: './src/assets/scripts/main'
      },
      output: {
        path: path.resolve('./dist/assets/scripts/'),
        publicPath: '/scripts/',
        filename: '[name]-[chunkhash:10].js'
      },
      watch: true,
      devtool: 'cheap-module-inline-source-map',
      module: {
        loaders: [{
          test:    /\.js$/,
          include: path.join(__dirname, "/dist/assets"),
          loader:  'babel?presets[]=es2015'
        }]
      },
      plugins: [
        new CleanWebpackPlugin(['dist/assets/scripts'], {
          root: path.resolve('./'),
          verbose: true,
          dry: false,
          watch: true
        }),
        new webpack.NoEmitOnErrorsPlugin()
      ]
    }

    options.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          unsafe: true
        }
      }),

      function () {
        this.plugin('done', stats => {
          require('fs').writeFileSync(
            path.resolve('./manifest/webpack.json'),
            JSON.stringify(stats.toJson().assetsByChunkName)
          )
        })
      }
    )

    webpack(options, function(err, stats) {
      if (!err) {
        err = stats.toJson().errors[0]
      }
      if (err) {
        notifier.notify({
          title: 'Webpack',
          message: err
        });

        gulplog.error(err)
      } else {
        gulplog.info(stats.toString({
          colors: true
        }));
      }

      if (!options.watch && err) {
        callback(err)
      } else {
        run('templates:dev')
        callback()
      }
    })

  };
};
