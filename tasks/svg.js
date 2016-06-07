'use strict'

const $            = require('gulp-load-plugins')();
const gulp         = require('gulp');

module.exports = function(options) {
  return function() {
    return gulp
      .src(options.src)
      .pipe($.svgSprite({
        mode: {
          inline: true,
          symbol: {
              dest: '.',
              sprite: 'sprite.svg'
          }
        },
        shape: {
          id: {separator: '-'}
        }
      }))
      .pipe(gulp.dest(options.dist))
  };
};