'use strict';
//(function(e){"use strict";function r(t,n){this.opts=e.extend({handleWheel:!0,handleScrollbar:!0,handleKeys:!0,scrollEventKeys:[32,33,34,35,36,37,38,39,40]},n);this.$container=t;this.$document=e(document);this.lockToScrollPos=[0,0];this.disable()}var t,n;n=r.prototype;n.disable=function(){var e=this;e.opts.handleWheel&&e.$container.on("mousewheel.disablescroll DOMMouseScroll.disablescroll touchmove.disablescroll",e._handleWheel);if(e.opts.handleScrollbar){e.lockToScrollPos=[e.$container.scrollLeft(),e.$container.scrollTop()];e.$container.on("scroll.disablescroll",function(){e._handleScrollbar.call(e)})}e.opts.handleKeys&&e.$document.on("keydown.disablescroll",function(t){e._handleKeydown.call(e,t)})};n.undo=function(){var e=this;e.$container.off(".disablescroll");e.opts.handleKeys&&e.$document.off(".disablescroll")};n._handleWheel=function(e){e.preventDefault()};n._handleScrollbar=function(){this.$container.scrollLeft(this.lockToScrollPos[0]);this.$container.scrollTop(this.lockToScrollPos[1])};n._handleKeydown=function(e){for(var t=0;t<this.opts.scrollEventKeys.length;t++)if(e.keyCode===this.opts.scrollEventKeys[t]){e.preventDefault();return}};e.fn.disablescroll=function(e){!t&&(typeof e=="object"||!e)&&(t=new r(this,e));t&&typeof e=="undefined"?t.disable():t&&t[e]&&t[e].call(t)};window.UserScrollDisabler=r})(jQuery);


////Adding extra functions to jQuery
//$.fn.disableScroll = function() {
//    window.oldScrollPos = $(window).scrollTop();
//    $(window).on('scroll.scrolldisabler',function ( event ) {
//       $(window).scrollTop( window.oldScrollPos );
//       event.preventDefault();
//    });
//};
//$.fn.enableScroll = function() {
//    $(window).off('scroll.scrolldisabler');
//};

/* FUNCTIONS and VARIABLES start */
var activeTab;
var map;

function openGallery(id, folder) {
//	$("body").on({
//		ontouchmove : function(e) {
//			e.preventDefault(); 
//		}
//	});
	//$('body').off();
	$('body').removeClass('scr');
	$('#theDimMaker').addClass('active').css('top', $('body').scrollTop());
	//$('body').disableScroll();
	$('.gallery-overlay').attr('id', id);
	//var folder = "img/accomodation/";
	var nr = 0;
	$('.gallery-overlay .overlay-content').empty();
	$.ajax({
		url : folder,
		success: function (data) {
			$(data).find("a").attr("href", function (i, val) {
				if ((val.match(/\.(jpe?g|png|gif)$/)) && (nr < 10)) {
					$('#' + id + ' .overlay-content').append("<img class= 'enlarge' src='" + folder + val + "'>");
					nr += 1;
				}
			});
		}
	});
//	$('#theDimMaker').ontouchmove = function(e) {
//		e.stopPropagation();
//	};
//	$('.gallery-overlay').ontouchmove = function(e) {
//		e.stopPropagation();
//	};
}
function openGoogleMaps() {
	setTimeout(function () {
		map = new google.maps.Map($('#gMapsDialog .overlay-content')[0], {
			center: {lat: -24.7768356, lng: 30.4437473},
			zoom: 10
		});
		setTimeout(function () {google.maps.event.trigger(map, 'resize')},100);
	},600);
}

function openDialog(id, src) {
	$('.overlay').removeClass('notransition');
	$('#theDimMaker').addClass('active').css('top', $('body').scrollTop());
	$('.overlay .overlay-content').empty();
	$('body').removeClass('scr');
	//.addClass('overlayAlive');
	if (id === 'gMapsDialog') {
		$('.overlay').attr('id', id);
		openGoogleMaps();
	} else {
		$('.overlay .overlay-content').append("<img src='" + src + "'>");
		$('.overlay').attr('id', id);
	}
}



function closeGallery() {
	$('#theDimMaker').removeClass('active');
    $('.gallery-overlay').removeAttr('id');
	$('body').addClass('scr');
}
function closeDialog() {
	$('.overlay').addClass('notransition');
	$('#theDimMaker').removeClass('active');
    $('.overlay').removeAttr('id');
	$('body').addClass('scr');
}

function enableScrollingOnThisElementOnly(selector) {
	var up, down;
	$(document.documentElement).on("wheel", selector, function (e) {
		//console.log(this.scrollHeight + " : " + this.clientHeight + " : " + this.scrollTop);
		// If the element is scrollable (content overflows), then...
		if (this.scrollHeight !== this.clientHeight) {

			// If we're at the top, scroll down one pixel to allow scrolling up
			if (this.scrollTop === 0) {
				this.scrollTop = 1;
			}
			// If we're at the bottom, scroll up one pixel to allow scrolling down
			if (this.scrollTop === this.scrollHeight - this.clientHeight) {
				this.scrollTop = this.scrollHeight - this.clientHeight - 1;
			}
		}
		// Check if we can scroll
		//alert(this.scrollHeight + " : " + this.clientWidth + " : " + this.scrollTop);
		this.allowUp = this.scrollTop > 0;
		this.allowDown = this.scrollTop < (this.scrollHeight - this.clientHeight);

		var event = e.originalEvent;
		if (e.originalEvent.wheelDelta < 0) {
			 //scroll down
			up = false;
			down = !up;
		}
		else {
			//scroll down
			up = true;
			down = !up;
		}
		console.log(this.allowDown + " : " + e.originalEvent.wheelDelta + " : " + this.scrollTop);
		if ((up && this.allowUp) || (down && this.allowDown)) {
			event.stopPropagation();
		} else {
			event.preventDefault();
		}
	});
	$(document.documentElement).on("touchstart",selector, function (e) {
		//console.log(this.scrollHeight + " : " + this.clientHeight + " : " + this.scrollTop);
		// If the element is scrollable (content overflows), then...
		if (this.scrollHeight !== this.clientHeight) {

			// If we're at the top, scroll down one pixel to allow scrolling up
			if (this.scrollTop === 0) {
				this.scrollTop = 1;
			}
			// If we're at the bottom, scroll up one pixel to allow scrolling down
			if (this.scrollTop === this.scrollHeight - this.clientHeight) {
				this.scrollTop = this.scrollHeight - this.clientHeight - 1;
			}
		}
		// Check if we can scroll
		//alert(this.scrollHeight + " : " + this.clientWidth + " : " + this.scrollTop);
		this.allowUp = this.scrollTop > 0;
		this.allowDown = this.scrollTop < (this.scrollHeight - this.clientHeight);
		this.lastY = e.originalEvent.pageY;
		//console.log("Original Target: "+ e.target.getAttribute('class'));
	});

	$(document.documentElement).on('touchmove',selector, function(e) {
		//console.log(this.scrollHeight + " : " + this.clientHeight + " : " + this.scrollTop);
		var event = e.originalEvent;
		var up = event.pageY > this.lastY;
		var down = !up;
		this.lastY = event.pageY;
		if ((up && this.allowUp) || (down && this.allowDown)) {
			event.stopPropagation();
		} else {
			event.preventDefault();
		}
	});
}

/* FUNCTIONS and VARIABLES close */

// After everything has loaded you can click to continue
$('body').click(function () {
	activeTab = "content-home";
	$('#wholePage').css('display', 'block');
	$('body').removeClass('stop-scrolling');
	$('body').off();
//    $('#logoContainer').css('position', 'fixed');
//    $('#logoContainer').css('width');
//    $('#logoContainer').css('width', '165px');
    $('#title_ico').attr('src', "img/logo1.png");
	$('#logoContainer').css('display', 'none');
//    $('#logoContainer').appendTo('#dieNavbar .container');
	//Get Home page
	$.ajax({
		url: 'content/content-home.html',
		method: 'GET'
	}).done(function (html) {
		$('#content').html(html);
	});
	//Scroll die body af tot by die NavBar
    $('body,html').animate({
        scrollTop: $(".navbar").offset().top
    }, 2000, function () {
		$('#landingContainer').css('display', 'none');
		$('html, body').scrollTop(0);
		$('#wholePage').css('margin-top', '50px');
		$('.navbar').addClass('navbar-fixed-top');

		// Disable scroll for the document, we'll handle it ourselves
		$(document).on('touchmove', function (e) {
			//console.log('Boom! Prevented...');
			e.preventDefault();
		});
		$(document).on('wheel', function (e) {
			//console.log('Boom! Prevented...');
			//if(!e){ e = window.event; }
		  	e.preventDefault();
		});
		enableScrollingOnThisElementOnly(".scroll-y");
						// Check if we should allow scrolling up or down
//		$(document.documentElement).on("scrollstart",'.scr', function (e){
//			//console.log(this.scrollHeight + " : " + screen.height + " : " + this.scrollTop);
//			// If the element is scrollable (content overflows), then...
//			if (this.scrollHeight !== screen.availHeight) {
//
//				// If we're at the top, scroll down one pixel to allow scrolling up
//				if (this.scrollTop === 0) {
//					this.scrollTop = 1;
//				}
//				// If we're at the bottom, scroll up one pixel to allow scrolling down
//				if (this.scrollTop === this.scrollHeight - screen.availHeight) {
//					this.scrollTop = this.scrollHeight - screen.availHeight - 1;
//				}
//			}
//			// Check if we can scroll
//			//alert(this.scrollHeight + " : " + this.clientWidth + " : " + this.scrollTop);
//			this.allowUp = this.scrollTop > 0;
//			this.allowDown = this.scrollTop < (this.scrollHeight - screen.availHeight);
//			this.lastY = e.originalEvent.pageY;
//		});

		$(document.documentElement).on('wheel','.scr', function(e) {
			// If the element is scrollable (content overflows), then...
//			if (this.scrollHeight !== screen.availHeight) {
//
//				// If we're at the top, scroll down one pixel to allow scrolling up
//				if (this.scrollTop === 0) {
//					this.scrollTop = 1;
//				}
//				// If we're at the bottom, scroll up one pixel to allow scrolling down
//				if (this.scrollTop === this.scrollHeight - screen.availHeight) {
//					this.scrollTop = this.scrollHeight - screen.availHeight - 1;
//				}
//			}
			// Check if we can scroll
			//alert(this.scrollHeight + " : " + this.clientWidth + " : " + this.scrollTop);
			this.allowUp = this.scrollTop > 0;
			this.allowDown = this.scrollTop < (this.scrollHeight - screen.availHeight);
//			console.log("BODY...! " + this.scrollHeight + " : " + screen.availHeight + " : " + this.scrollTop);
//			var event = e.originalEvent;

			if ((this.allowUp) || (this.allowDown)) {
				//console.log("BODY...! " + this.scrollHeight + " : " + screen.availHeight + " : " + this.scrollTop);
				//console.log("stopPropogation");
				//console.log(this.allowUp + " : " + this.allowDown);
				e.stopPropagation();
			} else {
				//console.log("PreventDefault");
				e.preventDefault();
			}
		});
		
				// Check if we should allow scrolling up or down
		$(document.documentElement).on("touchstart",'.scr', function (e){
			//console.log(this.scrollHeight + " : " + screen.height + " : " + this.scrollTop);
			// If the element is scrollable (content overflows), then...
			if (this.scrollHeight !== screen.availHeight) {

				// If we're at the top, scroll down one pixel to allow scrolling up
				if (this.scrollTop === 0) {
					this.scrollTop = 1;
				}
				// If we're at the bottom, scroll up one pixel to allow scrolling down
				if (this.scrollTop === this.scrollHeight - screen.availHeight) {
					this.scrollTop = this.scrollHeight - screen.availHeight - 1;
				}
			}
			// Check if we can scroll
			//alert(this.scrollHeight + " : " + this.clientWidth + " : " + this.scrollTop);
			this.allowUp = this.scrollTop > 0;
			this.allowDown = this.scrollTop < (this.scrollHeight - screen.availHeight);
			this.lastY = e.originalEvent.pageY;
		});

		$(document.documentElement).on('touchmove','.scr', function(e) {

			var event = e.originalEvent;
			var up = event.pageY > this.lastY;
			var down = !up;
			this.lastY = event.pageY;

			if ((up && this.allowUp) || (down && this.allowDown)) {
				//console.log("BODY...! " + this.scrollHeight + " : " + screen.availHeight + " : " + this.scrollTop);
				event.stopPropagation();
			} else {
				//console.log("Should not");
				event.preventDefault();
			}
		});
		
    });
});



// Clicking on any of the navigation buttons
$('.menu_item').click(function (e) {
    //closeGallery();
	//closeDialog();
	
	if(e.target.getAttribute("id") === activeTab) {
		
	}
	else {
		activeTab = e.target.getAttribute("id");
		$.ajax({
			url: 'content/' + this.id + '.html',
			method: 'GET'
		}).done(function (html) {
			$('#content').html(html);
		});
		$(document).scrollTop(0);
	}
});

// Assign click function for Google Maps
$('#title_ico').click(function (){
	openDialog('gMapsDialog');
});

$(document).on("click",".enlarge", function(obj){
	var newSrc = this.src.replace(/small/g,'large');
	openDialog('viewer',newSrc);
});

