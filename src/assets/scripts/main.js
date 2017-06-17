import jQuery from 'jquery'
import notify from '../../templates/_blocks/header/header'

(function ($) {

  $('document').ready(function() {

    console.log('Hello from main js with shiny webpack modular system!');

    notify("Modules works!!! I'm from Headers.js!")

  });

})(jQuery);
