(function($) {

	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)',
		xxsmall: '(max-width: 360px)'
	});

	$(function() {

		var	$window = $(window),
			$document = $(document),
			$body = $('body'),
			$wrapper = $('#wrapper'),
			$footer = $('#footer'),
			$main = $('.inner');

		// Disable animations/transitions until the page has loaded.
			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading-0');

					window.setTimeout(function() {
						$body.removeClass('is-loading-1');
					}, 1500);
				}, 100);

			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Panels.
			var $wrapper = $('#wrapper'),
				$panels = $wrapper.children('.panel'),
				locked = true;

			// Deactivate + hide all but the first panel.
				$panels.not($panels.first())
					.addClass('inactive')
					.hide();

				if(window.location.hash) {
					changePanel();
				}

				function changePanel() {
					if (location.hash != '#home') {
						// Activate target panel.
						$(window.location.hash).show();
						$(window.location.hash).removeClass('inactive');
						$(window.location.hash).addClass('active');
						$('#home').hide();
						$('#home').removeClass('active');
						$('#home').addClass('inactive');
					}
				}

				/*
				window.addEventListener('popstate', function (e) {
					var state = e.state;
					if (state !== null) {
						console.log(state);
					}
				});

				window.addEventListener('popstate', function(event) {
					console.log($(window.location.hash) + 'popstate');
				}, false);
				function locationHashChanged() {
					//changePanel();
					console.log($(window.location.hash));
				}
				window.onhashchange = locationHashChanged;
					//console.log($panel);
				*/
				// Deactivate link.
					//$this.removeClass('active');
					//$panels.
					//$this.addClass('active');

				var landsTimeout;

				function imageRotate() {
					clearTimeout(landsTimeout);
					let $image = $("#home").children('.image'),
						$img = $image.find('img');
					let imgArray = $img.toArray();
					$img.each(function(index) {
						landsTimeout = setTimeout(function(){
							$image.css('background-image', 'url(' + imgArray[index].src + ')');
							if ((index + 1) === $img.length) {
								setTimeout(function() {
									imageRotate() }, 4000)
							} else { index++; }
						}, 4000*index)
					});
				}

			// Fix images.
				$panels.each(function() {

					var	$this = $(this),
						$image = $this.children('.image'),
						$img = $image.find('img'),
						position = $img.data('position');

					// Set background.
						$image.css('background-image', 'url(' + $img.attr('src') + ')');
						if ($img.length > 1) {
							// var rotate = setInterval(imageRotate($image,$img), 4000);
							$image.css('-webkit-transition','background-image 1s ease-in-out','transition','background-image 1s ease-in-out;');
							imageRotate();
						}

					// Set position (if set).
						if (position)
							$image.css('background-position', position);

					// Hide original.
						$img.hide();

				});

			// Unlock after a delay.
				window.setTimeout(function() {
					locked = false;
				}, 1250);

			// Click event.
				$('a[href^="#"]').on('click', function(event) {

					var $this = $(this),
						id = $this.attr('href'),
						$panel = $(id),
						$ul = $this.parents('ul'),
						delay = 0;

					// Prevent default.
					/*
						event.preventDefault();
						event.stopPropagation();
					*/

				//window.history.pushState({state: new Date().getTime()}, '', $this.attr('href'));
					//history.pushState({}, '', $(this).attr("href"));
					//console.log($(this).attr("href"));
				//alert($(this).attr("href"));
					window.onpopstate = function(e) {
						//alert($panel.length);//id = window.location.hash;
						//console.log($panel);

					// Locked? Bail.
						if (locked)
							return;

					// Lock.
						locked = true;

					// Activate link.
						$this.addClass('active');

						if ($ul.hasClass('spinX')
						||	$ul.hasClass('spinY'))
							delay = 250;

					// Delay.
						window.setTimeout(function() {

							// Deactivate all panels.
								$panels.addClass('inactive');

							// Deactivate footer.
								$footer.addClass('inactive');

							// Delay.
								window.setTimeout(function() {

									// Hide all panels.
										$panels.hide();

									// Show target panel.
										//$panel.show();
										var hashVal = window.location.hash ? window.location.hash : '#home';

										// if (hashVal == '#home') imageRotate();

										if(window.location.hash) {
											$(window.location.hash).show();
											// clearTimeout(landsTimeout);
										} else {
											// Deactivate + hide all but the first panel.
											$panels.not($panels.first())
											.addClass('inactive')
											.hide();
											$("#home").show();
											//console.log('what');
											$('#home').removeClass('inactive');
											$('#home').addClass('active');
										}

									// Reset scroll.
										$document.scrollTop(0);

									// Delay.
										window.setTimeout(function() {

											// Activate target panel.
												//$panel.removeClass('inactive');
												$(window.location.hash).removeClass('inactive')
												//console.log($panel);

											// Deactivate link.
												$this.removeClass('active');



											// Unlock.
												locked = false;

											// IE: Refresh.
												$window.triggerHandler('--refresh');

											window.setTimeout(function() {

												// Activate footer.
													$footer.removeClass('inactive');

											}, 250);

										}, 100);

								}, 350);

						}, delay);
					};

				});
		// IE: Fixes.
			if (skel.vars.IEVersion < 12) {

				// Layout fixes.
					$window.on('--refresh', function() {

						// Fix min-height/flexbox.
						//	$wrapper.css('height', 'auto');

							window.setTimeout(function() {

								var h = $wrapper.height(),
									wh = $window.height();
									/*
console.log(h);
								if (h < wh)
									$wrapper.css('height', '100vh');
								*/

							}, 0);

						// Fix panel image/content heights (IE<10 only).
							if (skel.vars.IEVersion < 10) {

								var $panel = $('.panel').not('.inactive'),
									$image = $panel.find('.image'),
									$content = $panel.find('.content'),
									ih = $image.height(),
									ch = $content.height(),
									x = Math.max(ih, ch);

								$image.css('min-height', x + 'px');
								$content.css('min-height', x + 'px');

							}

					});

					$window.on('load', function() {
						$window.triggerHandler('--refresh');
					});

				// Remove spinX/spinY.
					$('.spinX').removeClass('spinX');
					$('.spinY').removeClass('spinY');

			}
			// Thumbs.
				$main.children('.thumb').each(function() {

					var	$this = $(this),
						$image = $this.find('.photo'), $image_img = $image.children('img'),
						x;
					// No image? Bail.
						if ($image.length == 0)
							return;

					// Image.
					// This sets the background of the "image" <span> to the image pointed to by its child
					// <img> (which is then hidden). Gives us way more flexibility.

						// Set background.
							$image.css('background-image', 'url(' + $image_img.attr('src') + ')');

						// Set background position.
							if (x = $image_img.data('position'))
								$image.css('background-position', x);

						// Hide original img.
							$image_img.hide();

					// Hack: IE<11 doesn't support pointer-events, which means clicks to our image never
					// land as they're blocked by the thumbnail's caption overlay gradient. This just forces
					// the click through to the image.
						if (skel.vars.IEVersion < 11)
							$this
								.css('cursor', 'pointer')
								.on('click', function() {
									$image.trigger('click');
								});

				});
			// Thumbs.
				$main.children('.thumb').each(function() {

					var	$this = $(this),
						$image = $this.find('.podcast'), $image_img = $image.children('img'),
						x;
					// No image? Bail.
						if ($image.length == 0)
							return;

					// Image.
					// This sets the background of the "image" <span> to the image pointed to by its child
					// <img> (which is then hidden). Gives us way more flexibility.

						// Set background.
							$image.css('background-image', 'url(' + $image_img.attr('src') + ')');

						// Set background position.
							if (x = $image_img.data('position'))
								$image.css('background-position', x);

						// Hide original img.
							$image_img.hide();

					// Hack: IE<11 doesn't support pointer-events, which means clicks to our image never
					// land as they're blocked by the thumbnail's caption overlay gradient. This just forces
					// the click through to the image.
						if (skel.vars.IEVersion < 11)
							$this
								.css('cursor', 'pointer')
								.on('click', function() {
									$image.trigger('click');
								});

				});
						// Poptrox.
				$main.poptrox({
					baseZIndex: 20000,
					caption: function($a) {

						var s = '';

						$a.nextAll().each(function() {
							s += this.outerHTML;
						});

						return s;

					},
					fadeSpeed: 300,
					onPopupClose: function() { $body.removeClass('modal-active'); },
					onPopupOpen: function() { $body.addClass('modal-active'); },
					overlayOpacity: 0,
					popupCloserText: '',
					popupHeight: 150,
					popupLoaderText: '',
					popupSpeed: 300,
					popupWidth: 150,
					selector: '.thumb > a.photo',
					usePopupCaption: true,
					usePopupCloser: true,
					usePopupDefaultStyling: false,
					usePopupForceClose: true,
					usePopupLoader: true,
					usePopupNav: true,
					windowMargin: 50
				});


	});

var $contactForm = $('#contact-form');
$contactForm.submit(function(e) {
	e.preventDefault();
	$.ajax({
		url: '//formspree.io/kaseembentley@yahoo.com',
		method: 'POST',
		data: $(this).serialize(),
		dataType: 'json',
		beforeSend: function() {
			$contactForm.append('<div class="alert alert--loading">Sending message…</div>');
		},
		success: function(data) {
			$contactForm.find('.alert--loading').hide();
			$contactForm.append('<div class="alert alert--success">Message sent!</div>');
		},
		error: function(err) {
			$contactForm.find('.alert--loading').hide();
			$contactForm.append('<div class="alert alert--error">Oops, there was an error.</div>');
		}
	});
});

})(jQuery);

// $(document).ready(function() {
// 	var feed = new Instafeed({
// 			get: 'user',
// 			limit: 14,
// 			resolution: 'low_resolution',
//       // userId: 313885121,
// 			userId: 144757963,
// 			clientId: 'e2c27e0857264304af0b9ca7354b79db',
// 			accessToken: '144757963.e2c27e0.4d4b9ddab8c849f2921121a09401ddc3',
// 			// template: '<a href="{{link}}"><img src="{{image}}" /><div>{{caption}}</div></a>'
// 			template: '<div class="wrap"><a href="{{link}}"><img src="{{image}}"/><div class="caption">{{caption}}</div></a></div>'
// 	});
// 	feed.run();
// });
$(document).ready(function() {
	$.getJSON("https://spreadsheets.google.com/feeds/list/1osPmH5ZOEkF9gFUvNquEYvgzl2fqvqe6ylQ1Xsu9srM/od6/public/values?alt=json", function(data) {
	 	var entry = data.feed.entry;
		if (entry === undefined || entry.length < 1) $('#shows label').hide();
		$(entry).each(function(){
		 $('#shows').append('<div><p><b>'+this.gsx$date.$t+'</b></p><p>'+this.gsx$venue.$t+'</p><p>'+this.gsx$address.$t+'</p><p><a href="'+this.gsx$url.$t+'" target="_blank">'+this.gsx$url.$t+'</a></p><br><br>');
		});
 	}).fail(function() {
	 $('#shows label').hide();
 	});
});
