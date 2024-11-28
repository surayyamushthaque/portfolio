(function() {
	'use strict';

	/*----------------------------------------
		Detect Mobile
	----------------------------------------*/
	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};


	// navigation
	var OnePageNav = function() {
		var navToggler = $('.navbar-toggler');
		$(".smoothscroll[href^='#'], #pb-navbar ul li a[href^='#']").on('click', function(e) {
		 	e.preventDefault();
		 	var hash = this.hash;
		 		
		 	$('html, body').animate({

		    scrollTop: $(hash).offset().top
		  }, 700, 'easeInOutExpo', function(){
		    window.location.hash = hash;
		  });
		});
		$("#pb-navbar ul li a[href^='#']").on('click', function(e){
			if ( navToggler.is(':visible') ) {
		  	navToggler.click();
		  }
		});

		$('body').on('activate.bs.scrollspy', function () {
		  console.log('nice');
		})
	};
	

	var offCanvasNav = function() {
		// var toggleNav = $('.js-pb_nav-toggle'),
		// 		offcanvasNav = $('.js-pb_offcanvas-nav_v1');
		// if( toggleNav.length > 0 ) {
		// 	toggleNav.click(function(e){
		// 		$(this).toggleClass('active');
		// 		offcanvasNav.addClass('active');
		// 		e.preventDefault();
		// 	});
		// }
		// offcanvasNav.click(function(e){
		// 	if (offcanvasNav.hasClass('active')) {
		// 		offcanvasNav.removeClass('active');
		// 		toggleNav.removeClass('active');
		// 	}
		// 	e.preventDefault();
		// })
	};
	


	/*----------------------------------------
		Animate Scroll
	----------------------------------------*/

	var contentWayPoint = function() {
		var i = 0;
		$('.site-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('site-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .site-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn site-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft site-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight site-animated');
							} else {
								el.addClass('fadeInUp site-animated');
							}
							el.removeClass('item-animate');
						},  k * 100, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};

	var navbarState = function() {

		var lastScrollTop = 0;
		$(window).scroll(function(){

			var $this = $(this),
				 	st = $this.scrollTop(),
				 	navbar = $('.site-navbar');

			if ( st > 200 ) {
				navbar.addClass('scrolled');
			} else {
				navbar.removeClass('scrolled awake');
			}

			if ( navbar.hasClass('scrolled') && st > 300 ) {
		   	if (st > lastScrollTop){
		      // if (navbar.hasClass('scrolled')) {
		      	// navbar.removeClass('awake');
		      	// navbar.addClass('sleep');
		      // }
		   	} else {
		      // if (navbar.hasClass('scrolled')) {
		      	// navbar.addClass('awake');
		      	// navbar.removeClass('sleep');
		      // }
		   	}
		   	lastScrollTop = st;
		  }

		});



		
	};

	
	
	
	var siteStellar = function() {
		$(window).stellar({
	    responsive: true,
	    parallaxBackgrounds: true,
	    parallaxElements: true,
	    horizontalScrolling: false,
	    hideDistantElements: false,
	    scrollProperty: 'scroll'
	  });
	};
	



	// Page Nav
	var clickMenu = function() {

		$('.navbar-nav a:not([class="external"])').click(function(event){

			var section = $(this).data('nav-section'),
				navbar = $('.navbar-nav');
				if (isMobile.any()) {
					$('.navbar-toggle').click();
				}
				if ( $('[data-section="' + section + '"]').length ) {
			    	$('html, body').animate({
			        	scrollTop: $('[data-section="' + section + '"]').offset().top
			    	}, 500, 'easeInOutExpo');
			   }

		    event.preventDefault();
		    return false;
		});


	};

	// Reflect scrolling in navigation
	var navActive = function(section) {

		var $el = $('.navbar-nav');
		$el.find('li').removeClass('active');
		$el.each(function(){
			$(this).find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
		});

	};

	var navigationSection = function() {

		var $section = $('section[data-section]');
		
		$section.waypoint(function(direction) {
		  	if (direction === 'down') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
	  		offset: '150px'
		});

		$section.waypoint(function(direction) {
		  	if (direction === 'up') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() - 155; }
		});

	};


	var smoothScroll = function() {
		var $root = $('html, body');

		$('.smoothscroll').click(function () {
			$root.animate({
		    scrollTop: $( $.attr(this, 'href') ).offset().top
			}, 500);
			return false;
		});
	};
	
	var magnificPopupControl = function() {


		$('.image-popup').magnificPopup({
			type: 'image',
			removalDelay: 300,
			mainClass: 'mfp-with-zoom',
			gallery:{
				enabled:true
			},
			zoom: {
				enabled: true, // By default it's false, so don't forget to enable it

				duration: 300, // duration of the effect, in milliseconds
				easing: 'ease-in-out', // CSS transition easing function

				// The "opener" function should return the element from which popup will be zoomed in
				// and to which popup will be scaled down
				// By defailt it looks for an image tag:
				opener: function(openerElement) {
				// openerElement is the element on which popup was initialized, in this case its <a> tag
				// you don't need to add "opener" option if this code matches your needs, it's defailt one.
				return openerElement.is('img') ? openerElement : openerElement.find('img');
				}
			}
		});

		$('.with-caption').magnificPopup({
			type: 'image',
			closeOnContentClick: true,
			closeBtnInside: false,
			mainClass: 'mfp-with-zoom mfp-img-mobile',
			image: {
				verticalFit: true,
				titleSrc: function(item) {
					return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
				}
			},
			zoom: {
				enabled: true
			}
		});


		$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
      disableOn: 700,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,

      fixedContentPos: false
    });
	};




	var portfolioMasonry = function() {
 $('.filters ul li').click(function(){
        $('.filters ul li').removeClass('active');
        $(this).addClass('active');
        
        var data = $(this).attr('data-filter');
        $grid.isotope({
          filter: data
        })
      });


      if(document.getElementById("section-portfolio")){
            var $grid = $(".grid").isotope({
              itemSelector: ".all",
              percentPosition: true,
              masonry: {
                columnWidth: ".all"
              }
            })
      };


	};


	$(function(){

		OnePageNav();
		offCanvasNav();
		contentWayPoint();
		navbarState();
		clickMenu();
		smoothScroll();
		portfolioMasonry();
	});

	


})();

//form validation///
var nameError = document.getElementById('name-error');
var phoneError = document.getElementById('phone-error');
var emailError = document.getElementById('email-error');
var messageError = document.getElementById('msg-error');
var submitError = document.getElementById('submit-error');

function validateName() {
    var name = document.getElementById('contact-name').value;
    if (name.length === 0) {
        nameError.innerHTML = 'Name is required';
        return false;
    }
    if (!name.match(/^[A-Za-z]+(\s[A-Za-z]+)+$/)) {
        nameError.innerHTML = 'Invalid name';
        return false;
    }
    nameError.innerHTML = '<i id="tick-error" class="fa-solid fa-circle-check"></i>';
    return true;
}

function validateEmail() {
    var email = document.getElementById('contact-email').value;
    if (email.length === 0) {
        emailError.innerHTML = 'Email is required';
        return false;
    }
    if (!email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        emailError.innerHTML = 'Email invalid';
        return false;
    }
    emailError.innerHTML = '<i id="tick-error" class="fa-solid fa-circle-check"></i>';
    return true;
}

function validatePhone(){
    var phone = document.getElementById('contact-phone').value;

    if(phone.length == 0){
        phoneError.innerHTML = 'Phone no is required';
        return false;
    }
    if(phone.length !== 10){
        phoneError.innerHTML = 'Phone no should be 10 digits';
        return false;
    }
    if(!phone.match(/^[0-9]{10}$/)){
        phoneError.innerHTML = '10 Digits only';
        return false;
    }

    phoneError.innerHTML = '<i id="tick-error" class="fas fa-check-circle"></i>';
    return true;
}

function validateMessage() {
    var message = document.getElementById('contact-msg').value;
    var required = 15;
    var left = required - message.length;
    if (left > 0) {
        messageError.innerHTML = left + ' more characters required';
        return false;
    }
    messageError.innerHTML = '<i id="tick-error" class="fa-solid fa-circle-check"></i>';
    return true;
}

function validateForm() {
    if (!validateName() || !validateEmail() || !validateMessage()) {
        submitError.innerHTML = 'Please fill all fields correctly and submit';
       	alert("Enter the field correctly!")
        setTimeout(function() { submitError.innerHTML = ''; }, 3000);
        return false;
    }
    submitError.innerHTML = '<i id="tick-error" class="fa-solid fa-circle-check"></i> Form submitted successfully';
    return true;
}