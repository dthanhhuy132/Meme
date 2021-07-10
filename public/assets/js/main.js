jQuery(function ($) {
    "use strict";

    var tcl_meme = window.tcl_meme || {};

    /*=======================================
    =             MAIN FUNCTION             =
    =======================================*/
    tcl_meme.navigation = function () {
        $(".ass1-header__menu li > a").click(function (e) {
            $(this).parent().find(".ass1-header__nav").slideToggle(300, 'swing');
        });
    }

    $(document).on("click", function (event) {
        var $trigger = $(".ass1-header__menu li > a, .dth-footer .dth-responsive-category");
        if ($trigger !== event.target && !$trigger.has(event.target).length) {
            $(".ass1-header__nav").slideUp("fast");
        }
    });
    // User icon - responsive
    $('.dth-responsive-logout-icon').click(function () {
        $(".user-option-responsive").toggleClass("user-option-responsive-open");
    });

    $(document).on("click", function (event) {
        var $trigger = $(".dth-responsive-logout-icon, .dth-responsive-logout-icon > li");
        if ($trigger !== event.target && !$trigger.has(event.target).length) {
            $(".user-option-responsive").removeClass("user-option-responsive-open");
        }
    });

    $(document).click(function (event) {
        if (!$(event.target).closest(".dth-responsive-logout-icon").length) {
            $(".user-option-responsive").removeClass("user-option-responsive-open");
        }
    });

    // Seach-icon - responsive
    $('.dth-responsive-search-icon').click(function () {
        console.log('chay trong main')

        $(".header-search-responsive-mobile").toggleClass("header-search-responsive-mobile-open");
        $(".header-search-responsive-mobile input").focus()

    });

    $(document).click(function (event) {
        if (!$(event.target).closest(".dth-responsive-search-icon, .header-search-responsive-mobile").length) {
            $(".header-search-responsive-mobile").removeClass("header-search-responsive-mobile-open");
        }
    });

    $(window).scroll(function () {
        let userEl = $('.user-option-responsive').hasClass("user-option-responsive-open");
        let searhEl = $(".header-search-responsive-mobile").hasClass("header-search-responsive-mobile-open");
        if (userEl) $('.user-option-responsive').removeClass("user-option-responsive-open")
        if (searhEl) $(".header-search-responsive-mobile").removeClass("header-search-responsive-mobile-open");
    });


    // 
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


