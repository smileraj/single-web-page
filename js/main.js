var getUrl 			= window.location;
var pageUrl 		= getUrl.pathname.split('/')[1];
var pageUrl2 		= getUrl.pathname.split('/')[2];
jQuery(document).ready(function ($) {
	 $(document).on("scroll", onScroll);
  // Header fixed and Back to top button
  $(window).scroll(function () {
	 /*  */
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
      $('#header').addClass('header-fixed');
    } else {
      $('.back-to-top').fadeOut('slow');
      $('#header').removeClass('header-fixed');
    }
  });
  $('.back-to-top').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // Initiate the wowjs
  new WOW().init();

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {
      opacity: 'show'
    },
    speed: 400
  });

  // Mobile Navigation
  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function (e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function (e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function (e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Smoth scroll on page hash links
  $('a[href*="#"]:not([href="#"])').on('click', function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {

      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if (!$('#header').hasClass('header-fixed')) {
            top_space = top_space - 20;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu').length) {
          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Porfolio filter
  $("#portfolio-flters li").click(function () {
    $("#portfolio-flters li").removeClass('filter-active');
    $(this).addClass('filter-active');

    var selectedFilter = $(this).data("filter");
    $("#portfolio-wrapper").fadeTo(100, 0);

    $(".portfolio-item").fadeOut().css('transform', 'scale(0)');

    setTimeout(function () {
      $(selectedFilter).fadeIn(100).css('transform', 'scale(1)');
      $("#portfolio-wrapper").fadeTo(300, 1);
    }, 300);
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });
	$('a[href*=#]').bind('click', function(e) {
		 if ($(".home").length >0){ 
			e.preventDefault(); // prevent hard jump, the default behavior

			var target = '#'+$(this).attr("href").split('#')[1]; // Set the target as variable
			var notNumber = isNaN(parseInt($(this).attr("href").split('#')[1]));
			//console.log(target);
			console.log(target);
			console.log($('#header').height());
			if(target != '' && target != undefined && target != null && isNaN($(this).attr("href").split('#')[1])){
				var theight = $(target).offset().top ;//- $('#masthead').height()-65;
				// perform animated scrolling by getting top-position of target-element and set it as scroll target
				console.log($(target).offset().top);
				console.log(theight);
				var id = $('#nav-menu li a').index(this);
				$('#nav-menu').removeClass("toggled-on")//to close nav li list
				$(window).stop().animate({
						scrollTop: theight
				}, 600, function() {
					console.log(id)
					$('.menu-active').removeClass('menu-active');
					$('#nav-menu li:eq('+id+')').addClass('menu-active');
					
					history.pushState({},'',target)
						//location.hash = target; //attach the hash (#jumptarget) to the pageurl
				});
			}else if(!notNumber){
				console.log("redirection");
				window.location.href = $(this).attr("href");
				return true;
			}
			return false;
		} 
	});
	
	/* remove default class*/
	//to scroll specific blog -- start
	//if($('body .scroll-to-post .scroll-post').length){
		var scrollPost = window.location.hash.split('#')[1];
		$(window).load(function(){
			console.log(scrollPost);
			if($('#'+scrollPost).length)
			{
				var header = $('#header-fixed').height();
				$('#header').addClass('header-fixed');
				if($('#header-fixed').length){
					var top = parseInt($('#'+scrollPost).offset().top- header-100);
					console.log(top);
					$('html,body').animate({scrollTop:top},1000);
					console.log(header);
				}else{
					var top = parseInt($('#'+scrollPost).offset().top-70);
					//console.log(top);
					$('html,body').animate({scrollTop:top},1000);
				}
			}
		});
	//}


});
function onScroll(event){
	var scrollPos = $(document).scrollTop();
	$('.nav-menu li a').each(function () {
		var currLink = $(this);
		var currLi = $(this).parent('li');
		var value=currLink.attr("href").split('#')[1];
		var refElement = $('#'+value);
		console.log(refElement);
		if(refElement.length){
		console.log(refElement.position().top);
		console.log(scrollPos);
		if($('#casestudies_page').length){
			if(!$('.menu-active').length)
			$('.nav-menu li:eq(3)').addClass("menu-active");
		}else if($('#service_page').length){
			if(!$('.menu-active').length)
			$('.nav-menu li:eq(2)').addClass("menu-active");
		}else{
			if ((refElement.position().top-72) <= scrollPos ) {
				$('.nav-menu li').each(function(){
					$(this).removeClass("menu-active");
				});
				currLi.addClass("menu-active");
			}else if(scrollPos<100){
				currLi.removeClass("menu-active");
				if($('#casestudies_page').length)
				$('.nav-menu li:eq(3)').addClass("menu-active");
				else
				$('.nav-menu li:eq(0)').addClass("menu-active");
			}
			else{
				
				currLi.removeClass("menu-active");
			}
		}
		}
	}); 
	
}
