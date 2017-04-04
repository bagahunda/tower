'use strict';

const gulp        = require('gulp');
const browserSync = require('browser-sync').create();

module.exports = function(options) {

  return function() {

    browserSync.init({
      server: options.src,
      browser: "google chrome",
        files: [
        'dist/assets/styles/*.css',
        'dist/assets/scripts/*.js',
        'dist/*.html',
      ]
    });

    // gulp.watch(`${options.src}/**/*.html`).on('change', browserSync.reload);
    // gulp.watch(`${options.src}/assets/scripts/*.js`).on('change', browserSync.reload);
  };

};
