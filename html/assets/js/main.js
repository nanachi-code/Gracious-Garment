(function ($) {
    "use strict";

    $('.menu-toggle').hover(function () {
        $('.menu').slideDown();
    }, function () {
        $('.menu').slideUp();
    });

})(jQuery);