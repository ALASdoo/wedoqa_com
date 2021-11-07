/* ========================================================================= */
/*	Page Preloader
/* ========================================================================= */

$(window).on('load', function () {
  $('.preloader').fadeOut(100);
});

jQuery(function ($) {
  'use strict';

  /* ========================================================================= */
  /*	open external links in new tabs
	/* ========================================================================= */

  $(document.links).filter(function() {
    return this.hostname != window.location.hostname;
  }).attr('target', '_blank');

  /* ========================================================================= */
  /*	lazy load initialize
	/* ========================================================================= */

  var observer = lozad(); // lazy loads elements with default selector as ".lozad"
  observer.observe();

  /* ========================================================================= */
  /*	Magnific popup
	/* =========================================================================  */
  $('.image-popup').magnificPopup({
    type: 'image',
    removalDelay: 160, //delay removal by X to allow out-animation
    callbacks: {
      beforeOpen: function () {
        // just a hack that adds mfp-anim class to markup
        this.st.image.markup = this.st.image.markup.replace(
          'mfp-figure',
          'mfp-figure mfp-with-anim'
        );
        this.st.mainClass = this.st.el.attr('data-effect');
      },
    },
    closeOnContentClick: true,
    midClick: true,
    fixedContentPos: false,
    fixedBgPos: true,
  });

  /* ========================================================================= */
  /*	Portfolio Filtering Hook
	/* =========================================================================  */

  var containerEl = document.querySelector('.shuffle-wrapper');
  if (containerEl) {
    var Shuffle = window.Shuffle;
    var myShuffle = new Shuffle(document.querySelector('.shuffle-wrapper'), {
      itemSelector: '.shuffle-item',
      buffer: 1,
    });

    jQuery('input[name="shuffle-filter"]').on('change', function (evt) {
      var input = evt.currentTarget;
      if (input.checked) {
        myShuffle.filter(input.value);
      }
    });
	}

  /* ========================================================================= */
  /*	Testimonial Carousel
	/* =========================================================================  */

  $('#testimonials').slick({
    infinite: true,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
    prevArrow: '<div class="carousel-left d-none d-sm-block">&lt;</div>',
    nextArrow: '<div class="carousel-right d-none d-sm-block">&gt;</div>'
  });

  /* ========================================================================= */
  /*	animation scroll js
	/* ========================================================================= */

  var html_body = $('html, body');
  $('.navbar-nav a, .page-scroll').on('click', function () {
    //use page-scroll class in any HTML tag for scrolling
    if (
      location.pathname.replace(/^\//, '') ===
        this.pathname.replace(/^\//, '') &&
      location.hostname === this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        html_body.animate(
          {
            scrollTop: target.offset().top - 50,
          },
          1500,
          'easeInOutExpo'
        );
        return;
      }
    }
  });

  // easeInOutExpo Declaration
  jQuery.extend(jQuery.easing, {
    easeInOutExpo: function (x, t, b, c, d) {
      if (t === 0) {
        return b;
      }
      if (t === d) {
        return b + c;
      }
      if ((t /= d / 2) < 1) {
        return (c / 2) * Math.pow(2, 10 * (t - 1)) + b;
      }
      return (c / 2) * (-Math.pow(2, -10 * --t) + 2) + b;
    },
  });


  /* ========================================================================= */
  /*	close menu on click outside header or click on navigation item
  /* ========================================================================= */
  $(window).on('click', function (e) {
    if ($(e.target.closest('.navbar')).length > 0 && !$(e.target.closest('.navbar a')).length > 0) {
      return;
    }

    var navbar_collaps = $('.navbar-collapse');
    if (navbar_collaps.hasClass('show')) {
      $('.navbar-toggler').click()
    }
  })

  /* ========================================================================= */
  /*	counter up
	/* ========================================================================= */
  function counter() {
    var oTop;
    if ($('.count').length !== 0) {
      oTop = $('.count').offset().top - window.innerHeight;
    }
    if ($(window).scrollTop() > oTop) {
      $('.count').each(function () {
        var $this = $(this),
          countTo = $this.attr('data-count');
        $({
          countNum: $this.text(),
        }).animate(
          {
            countNum: countTo,
          },
          {
            duration: 1000,
            easing: 'swing',
            step: function () {
              $this.text(Math.floor(this.countNum));
            },
            complete: function () {
              $this.text(this.countNum);
            },
          }
        );
      });
    }
  }
  $(window).on('scroll', function () {
    counter();
  });


  /* ========================================================================= */
  /*	Reduce textarea on small screens
  /* ========================================================================= */

  var messageHTML = $('#message')[0];
  if ($(window).innerHeight() <= 600) {
    messageHTML.rows = 5;
  }
  else {
    messageHTML.rows = 10;
  }


  /**
   * Set height to Hero section based on the browser height
   * fix flickering 
   * https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
   */
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

});
