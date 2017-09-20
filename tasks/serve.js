'use strict';

module.exports = function(options) {

  return function() {

    $.browserSync.init({
      server: options.src,
      browser: "google chrome"
    });
  };

  browserSync.watch(`${options.src}/assets/**/*.*`).on('change', browserSync.reload);

};
