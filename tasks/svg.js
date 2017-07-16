'use strict'

module.exports = function(options) {
  return function() {
    return $.gulp
      .src(options.src)
      .pipe($.gp.plumber())
      .pipe($.gp.svgmin())
      .pipe($.gp.svgstore({
        inlineSvg: true
      }))
      .pipe($.gp.cheerio({
        run: function ($) {
          $('[fill]').removeAttr('fill');
          $('[style]').removeAttr('style');
        },
        parserOptions: { xmlMode: true }
      }))
      // .pipe($.replace('&gt;', '>'))
      .pipe($.gulp.dest(options.dist))
  };
};
