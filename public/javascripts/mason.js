(function(document) {

  window.GM = window.GM || {};

  /**
   * Normalized hide address bar for iOS & Android
   * (c) Scott Jehl, scottjehl.com
   * MIT License
  */

  // If we split this up into two functions we can reuse
  // this function if we aren't doing full page reloads.

  // If we cache this we don't need to re-calibrate everytime we call
  // the hide url bar
  GM.BODY_SCROLL_TOP = false;

  // So we don't redefine this function everytime we
  // we call hideUrlBar
  GM.getScrollTop = function() {
      var win = window;
      var doc = document;

      return win.pageYOffset || doc.compatMode === 'CSS1Compat' && doc.documentElement.scrollTop || doc.body.scrollTop || 0;
  };

  // It should be up to the mobile
  GM.hideUrlBar = function() {
      var win = window;

      // if there is a hash, or GM.BODY_SCROLL_TOP hasn't been set yet, wait till that happens
      if (!location.hash && GM.BODY_SCROLL_TOP !== false) {
          win.scrollTo( 0, GM.BODY_SCROLL_TOP === 1 ? 0 : 1 );
      }
  };

  GM.hideUrlBarOnLoad = function() {
      var win = window;
      var doc = win.document;
      var bodycheck;

      // If there's a hash, or addEventListener is undefined, stop here
      if ( !location.hash && win.addEventListener ) {

          // scroll to 1
          window.scrollTo( 0, 1 );
          GM.BODY_SCROLL_TOP = 1;

          // reset to 0 on bodyready, if needed
          bodycheck = setInterval(function() {
              if ( doc.body ) {
                  clearInterval( bodycheck );
                  GM.BODY_SCROLL_TOP = GM.getScrollTop();
                  GM.hideUrlBar();
              }
          }, 15 );

          win.addEventListener('load', function() {
              setTimeout(function() {
                  // at load, if user hasn't scrolled more than 20 or so...
                  if (GM.getScrollTop() < 20) {
                      // reset to hide addr bar at onload
                      GM.hideUrlBar();
                  }
              }, 0);
          });
      }
  };


})(document);

/* Tack box hover */
$(".tack_thumb").hover(
  function () {
    $(".hover_box", this).addClass("visible");
    //$(".hover_box", this).fadeIn("1200");
  },
  function () {
    $(".hover_box", this).removeClass("visible");
    //$(".hover_box", this).fadeOut("1200");
   // $(".hover_box", this).find("div:last").remove();
  }
);

/* Nav on mobile */
$(".nav_toggle").click(function () {
  $(".nav_wrapper").toggle();
});

$(function() {
    var $subscribe = $('#sidebar_subscribe');
    var $window = $(window);
    var $footer = $('.footer');
    var maxTop = $footer.offset().top + $footer.height() - $subscribe.height();
    window.navFixed = 1;
    
    $window.bind("scroll resize", function() {
        var currentTop = $window.scrollTop();
        if (currentTop <= maxTop && window.navFixed == 0) {
            $subscribe.css({
                position: 'fixed',
            });
            window.navFixed = 1;
        } else if (currentTop > maxTop && window.navFixed == 1) {
            $subscribe.css({
                position: 'absolute',
                top: maxTop
            });
            window.navFixed = 0;
        }
    }).scroll();
});

$("#target").submit(function(event) {
    alert("Handler called");
    event.preventDefault();
});

$(function() {
  $(".like.auth, .unlike").click(function(event) {
    event.preventDefault();
    link = $(this);
    url = link.attr('href');
    link.hasClass("like") ? sibCls = ".unlike" : sibCls = ".like";
    link.addClass("hidden");
    link.siblings(sibCls).removeClass("hidden");
    $.post(url, function(data, status){
      if (status=="success") {
          // do something
      } else {
         // This makes the link go through normal http page refresh if the ajax fails
         // link.removeClass();
         // DO SOMETHING HERE
      }
    });
  });
});