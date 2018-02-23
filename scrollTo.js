var lastScrollTop = 0;
window.completed = true;

function scrollTo(TO) {
	if (window.completed) {
		if ( $( TO ).length ) {
			window.completed = false;
			$('html, body').animate({
				scrollTop: $( TO ).offset().top
			}, {
				complete: function() {
					setTimeout(function(){
						window.completed = true;
					}, 100);
				},
				duration: 500
			});
		}
	}
}

window.addEventListener('scroll', function(){
	var currentScrollTop = $(window).scrollTop();
	var sections = document.querySelectorAll('.scrollTo');

	if (currentScrollTop > lastScrollTop){
		for (var i = 0; i < sections.length; i++) {
			if ( i == 0 ) {
				if ( currentScrollTop > 0 && currentScrollTop < $( sections[ i ] ).offset().top ) {
					scrollTo( sections[ i ] );
				}
			} else if ( i > 0 ) {
				if ( currentScrollTop > $( sections[ i - 1 ] ).offset().top && currentScrollTop < $( sections[ i ] ).offset().top ) {
					scrollTo( sections[ i ] );
				}
			}
		}
	} else {
		for (var i = sections.length - 1; i >= 0; i--) {
			if ( i == 0 ) {
				if ( currentScrollTop > 0 && currentScrollTop < $( sections[ i ] ).offset().top ) {
					scrollTo( 'body' );

					console.log('To Body');
				}
			} else if ( i > 0 ) {
				if ( currentScrollTop > $( sections[ i - 1 ] ).offset().top && currentScrollTop < $( sections[ i ] ).offset().top ) {
					scrollTo( sections[ i - 1 ] );

					console.log( 'To ' + (i - 1) );
				}
			}
		}
	}

	lastScrollTop = currentScrollTop;
});

$(document).on('click', 'a[href^="#"]', function(event){
	event.preventDefault();
	scrollTo( $(this).attr('href') );
});

$(document).on('click', '.scrollToNext', function(event){
	scrollTo( '.scrollTo:first' );
});
