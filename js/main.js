$(document).ready(function () {


	let previousScroll = 0,
		headerOrgOffset = $('header').height();

	$(window).scroll(function () {
		let currentScroll = $(this).scrollTop();
		if (currentScroll > headerOrgOffset) {
			if (currentScroll > previousScroll) {
				$('header').fadeOut();
			} else {
				$('header').fadeIn();
				$('header').addClass('fixed');

			}
		} else {
			$('header').removeClass('fixed');
		}
		previousScroll = currentScroll;
	});

	$(document).on("click", ".header-nav ul li a", function (event) {
		event.preventDefault();
		var id = $(this).attr('href'),
			top = $(id).offset().top;
		$('body,html').animate({ scrollTop: top }, 1500);
	});

	$(document).on('click', '.burger', function () {
		$('.burger').toggleClass('active');
		$('.mobil-meny').toggleClass('active');
	});



	$(document).on('click', '.card-btn', function () {
		$('.popup').addClass('active');
		$('.overlay').addClass('active');
		$('body').addClass('fixed');
	});

	$(document).on('click', '.popup-content .close', function () {
		$('.popup').removeClass('active');
		$('.overlay').removeClass('active');
		$('body').removeClass('fixed');
	});




	$('.images-slider').hide();
	$('.images-slider.active').show();
	$('.chack-box').click(function () {
		$(".chack-box").removeClass("active").eq($(this).index()).addClass("active")
		$(".images-slider").removeClass("active").eq($(this).index()).addClass("active");

		let current_radio = $(this).attr('data-radio')
		$('.images-slider').hide();
		$('.' + current_radio).show();
	})






	$(".partners-item .tabs").off('click').on("click", function (e) {
		e.preventDefault();
		$(".partners-item .tabs").removeClass("active").eq($(this).index()).addClass("active")
		$(".partners-inner").removeClass("active").eq($(this).index()).addClass("active");
	});

	$('.users-file-block').on('change', function (e) {
		if (e.target.className === 'users-file') {
			var files = e.target.files.length;
			var text = files ? 'Attached  CV: ' + files : 'Upload your CV';
			$(this).find('label').text(text);
		}
	});
	$(document).on('submit', '.users-form', function (e) {
		e.preventDefault();

		let form = $(this);
		let data = {
			action: 'fb_form',
			name: form.find('input[name="users-name"]').val(),
			phone: form.find('input[name="users-tel"]').val(),
			email: form.find('input[name="users-email"]').val(),
			comment: form.find('textarea[name="users-comment"]').val(),
		};

		$.ajax({
			url: messages.ajax_url,
			method: 'POST',
			data: data,
			beforeSend: function (xhr) {
				formLoader(form, true)
			},
			success: function () {
				showMessage(messages.sending_success, 'success')
				$('.popup-close').click();
				formLoader(form, false);
				form[0].reset();
			},
			error: function () {
				showMessage(messages.sending_error)
				formLoader(form, false)
			}
		}).done(function (data) {
			// showMessage(messages.sending_error)
			// formLoader(form, false);
		});
	});

	new Swiper('.images-slider', {

		slidesPerView: 3.2,
		spaceBetween: 20,

		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		pagination: {
			el: " .swiper-pagination",
			type: "progressbar",
		},
		breakpoints: {
			320: {

				slidesPerView: 1,
				spaceBetween: 10,
			},
			500: {
				slidesPerView: 2.2,
				spaceBetween: 15,
			},

			900: {
				slidesPerView: 3.2
			}


		}

	})

})