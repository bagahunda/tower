'use strict'

const gulp          = require('gulp');
const webpack       = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('../webpack.config.js');

module.exports = function(options) {

  return function() {
    return gulp
      .src(options.src)
      .pipe(webpackStream(webpackConfig), webpack)
      .pipe(gulp.dest('./dist/assets/scripts'))
      .pipe($.browserSync.stream())
  }

}
