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
      .pipe($.stylus({
        use: [rupture(), poststylus(['lost', autoprefixer()])]
      }))
      .pipe($.csso())
      // .pipe($.rev())
      .pipe(gulp.dest('./dist/assets/styles'))
      // .pipe($.rev.manifest('css.json'))
      // .pipe(gulp.dest('manifest'))
  };
};
