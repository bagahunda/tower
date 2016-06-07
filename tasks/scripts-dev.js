'use strict'

const $            = require('gulp-load-plugins')();
const gulp         = require('gulp');

module.exports = function(options) {
  return function() {
    return gulp
      .src(options.src)
      .pipe($.sourcemaps.init())
      .pipe($.concat('temp.js'))
      .pipe($.rename('build.js'))
      .pipe($.uglify())
      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest('./dist/assets/scripts'))
  };
};