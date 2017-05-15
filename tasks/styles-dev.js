'use strict'

const $            = require('gulp-load-plugins')();
const gulp         = require('gulp');
const poststylus   = require('poststylus');
const lost         = require('lost');
const rupture      = require('rupture');
const autoprefixer = require('autoprefixer')
const cssnano      = require('cssnano');
const bsError      = require('./errors.js')

module.exports = function(options) {
  return function() {
    return gulp
      .src(options.src)
      .pipe($.plumber(bsError))
      .pipe($.sourcemaps.init())
      .pipe($.stylus({
        use: [rupture(), poststylus(['lost', autoprefixer()])]
      }))
      .pipe($.postcss([cssnano()]))
      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest('./dist/assets/styles'))
  };
};
