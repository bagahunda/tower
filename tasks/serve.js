'use strict';

module.exports = function(options) {

  return function() {

    $.browserSync.init({
      server: options.src,
      open: false
    });
  };
};
