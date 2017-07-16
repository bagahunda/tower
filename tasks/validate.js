'use strict'

module.exports = function(options) {
  return function() {
    return $.gulp
      .src(options.src)
      .pipe($.gp.w3cjs())
      .pipe($.gp.w3cjs.reporter());
  };
};
