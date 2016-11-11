'use strict'

const $            = require('gulp-load-plugins')();
const gulp         = require('gulp');
const poststylus   = require('poststylus');
const lost         = require('lost');
const rupture      = require('rupture');
const autoprefixer = require('autoprefixer')

module.exports = function(options) {
  return function() {
    return gulp
      .src(options.src)
      .pipe($.plumber())
      .pipe($.sourcemaps.init())
      .pipe($.stylus({
        use: [rupture(), poststylus(['lost', autoprefixer()])]
      }))
      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest('./dist/assets/styles'))
  };
};
