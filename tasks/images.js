'use strict'

const gulp = require('gulp');
const $    = require('gulp-load-plugins')();

module.exports = function(options) {
  return function() {
    return gulp
      .src(options.src, {since: gulp.lastRun(options.taskName)})
      .pipe($.imagemin())
      .pipe(gulp.dest('./dist/assets/images'));
  };
};