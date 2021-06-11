jQuery(function ($) {
    "use strict";

    var tcl_meme = window.tcl_meme || {};

    /*=======================================
    =             MAIN FUNCTION             =
    =======================================*/
    tcl_meme.navigation = function () {
        $(".ass1-header__menu li > a").click(function (e) {
            // $(".ass1-header__nav").hide();
            $(this).parent().find(".ass1-header__nav").slideToggle(300, 'swing');
        });
    }
    tcl_meme.isotope = function () {
        var $gridMasonry = $('.ass1-section__isotope-init').masonry({
            columnWidth: '.grid-sizer',
            itemSelector: '.ass1-section__item',
            percentPosition: true
        });
    }

    /*======================================
    =            INIT FUNCTIONS            =
    ======================================*/

    $(document).ready(function () {
        tcl_meme.navigation();
        tcl_meme.isotope();
    });

    /*=====  End of INIT FUNCTIONS  ======*/

    $(window).on('load', function () {
    });

});
