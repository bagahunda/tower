'use strict'

// const favicons = require('gulp-favicons');

module.exports = function(options) {
  return function() {
    return $.gulp
      .src(options.src)
      .pipe($.gp.favicons({
        appName: 'Tower',
        appDescription: 'Frontend starter kit',
        developerName: 'Dmitriy Pochodnya',
        developerURL: 'http://github.com/bagahunda',
        background: "#FFFFFF",
        path: '/',
        url: '',
        display: "standalone",
        orientation: "portrait",
        version: '1.0',
        logging: false,
        online: false,
        html: './dist/index.html',
        pipeHTML: true,
        replace: true,
        icons: {
          android: false, // Create Android homescreen icon. `boolean`
          appleIcon: true, // Create Apple touch icons. `boolean`
          appleStartup: false, // Create Apple startup images. `boolean`
          coast: true, // Create Opera Coast icon. `boolean`
          favicons: true, // Create regular favicons. `boolean`
          firefox: true, // Create Firefox OS icons. `boolean`
          opengraph: false, // Create Facebook OpenGraph image. `boolean`
          twitter: false, // Create Twitter Summary Card image. `boolean`
          windows: true, // Create Windows 8 tile icons. `boolean`
          yandex: true // Create Yandex browser icon. `boolean`
        }
      }))
      .pipe($.gulp.dest(options.dest))
  };
};
