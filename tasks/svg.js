'use strict'

const $            = require('gulp-load-plugins')();
const gulp         = require('gulp');

module.exports = function(options) {
  return function() {
    return gulp
      .src(options.src)
      .pipe($.svgmin())
      .pipe($.svgstore({
        inlineSvg: true
      }))
      .pipe($.cheerio({
        run: function ($) {
          $('[fill]').removeAttr('fill');
          $('[style]').removeAttr('style');
        },
        parserOptions: { xmlMode: true }
      }))
      // .pipe($.replace('&gt;', '>'))
      .pipe(gulp.dest(options.dist))
  };
};