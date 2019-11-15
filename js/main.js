var myWeb = function(){
	var
	// Burger Menu
	burgerMenu = function() {
		$('body').on('click', '.js-nav-toggle', function(event){
			event.preventDefault();
			if ( $('#navbar').is(':visible') ) {
				$(this).removeClass('active');
			} else {
				$(this).addClass('active');
			}
		});
	},
	// Page Nav
	clickMenu = function() {
		$('#navbar a:not([class="external"])').click(function(event){
			var section = $(this).data('nav-section'),
				navbar = $('#navbar');
			if ( $('[data-section="' + section + '"]').length ) {
		    	$('html, body').animate({
		        	scrollTop: $('[data-section="' + section + '"]').offset().top
		    	}, 500);
		    }
		    if ( navbar.is(':visible')) {
		    	navbar.removeClass('in');
		    	navbar.attr('aria-expanded', 'false');
		    	$('.js-nav-toggle').removeClass('active');
		    }
		    event.preventDefault();
		    return false;
		});
	},
	// Reflect scrolling in navigation
	navActive = function(section) {
		var $el = $('#navbar > ul');
		$el.find('li').removeClass('active');
		$el.each(function(){
			$(this).find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
		});
	},
	navSection = function() {
		var $section = $('section[data-section]');
		$section.waypoint(
			function(direction) {
			  	if (direction === 'down') {
			    	navActive($(this.element).data('section'));
			  	}
			}, {
		  		offset: '150px'
			}
		);

		$section.waypoint(
			function(direction) {
			  	if (direction === 'up') {
			    	navActive($(this.element).data('section'));
			  	}
			}, {
			  	offset: function() { return -$(this.element).height() + 155; }
			}
		);
	},
	// nax fixed
	windowScroll = function() {
		var lastScrollTop = 0;
		$(document).scroll(function(){
		   	var header = $('#header'),
				scrlTop = $(this).scrollTop();

			if ( scrlTop > 10 && scrlTop <= 2000 ) {
				header.addClass('navbar-fixed header-animated slideInDown');
			} else if ( scrlTop <= 500) {
				if ( header.hasClass('navbar-fixed') ) {
					header.addClass('navbar-fixed header-animated slideOutUp');
					setTimeout(function(){
						header.removeClass('navbar-fixed header-animated slideInDown slideOutUp');
					}, 100 );
				}
			}
		});
	};
	// skill
	skill = function(){
		$('.circleChart').each(function(index, el) {
            var $this = $(this), value = $this.attr('data-value');
            $this.circleChart({
                size: 100,
                value: value,
                color: "#E9E9E9",
                backgroundColor: "#444",
                text: 0,
                onDraw: function(el, circle) {
                    circle.text(Math.round(circle.value) + "%");
                }
            });
        });
	},
	// my works show
	initCashemir = function(){
		"use strict";

		var filterList = {
		    init: function() {
		        // MixItUp plugin
		        $('#portfoliolist').mixitup({
		            targetSelector: '.portfolio',
		            filterSelector: '.filter',
		            effects: ['fade'],
		            easing: 'snap',
		            // call the hover effect
		            onMixEnd: filterList.hoverEffect()
		        });
		    },
		    hoverEffect: function() {
		        // Simple parallax effect
		        $('#portfoliolist .portfolio').hover(
		        function() {
		            $(this).find('.layer').stop().animate({
		                bottom: 0
		            },
		            200, 'easeOutQuad');
		            $(this).find('img').stop().animate({
		                top: -10
		            },
		            500, 'easeOutQuad');
		        },

		        function() {
		            $(this).find('.layer').stop().animate({
		                bottom: -200
		            },
		            200, 'easeInQuad');
		            $(this).find('img').stop().animate({
		                top: 0
		            },
		            300, 'easeOutQuad');
		        });
		    }
		};

		// Run the show!
		filterList.init();

		$('#J-options li').click(function(){
		  	$('#J-options li').removeClass('actcat');
		  	$(this).addClass('actcat');
		});
	},
	exprience = function(){
		var $timeline_block = $('.cd-timeline-block');
		//hide timeline blocks which are outside the viewport
		$timeline_block.each(function(){
			if($(this).offset().top > $(window).scrollTop()+$(window).height()*0.75) {
				$(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
			}
		});
		//on scolling, show/animate timeline blocks when enter the viewport
		$(window).on('scroll', function(){
			$timeline_block.each(function(){
				if( $(this).offset().top <= $(window).scrollTop()+$(window).height()*0.75 && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) {
					$(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
				}
			});
		});
	},
	goToTop = function() {
		$('.js-gotop').on('click', function(event){
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500);
			
			return false;
		});
	},
	init = function(){
		burgerMenu();
		clickMenu();
		navActive();
		navSection();
		windowScroll();
		skill();
		initCashemir();
		exprience();
		goToTop();
	}
	init();
}
$(document).ready(function(){
	myWeb();
});