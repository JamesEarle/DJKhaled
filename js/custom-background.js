/*
  Developed By:
      James Earle
      me@jamesearle.ca
      www.jamesearle.ca
*/

$(document).ready(function() {
  // Get next background.
  var first_bg = bg[Math.floor(Math.random() * bg.length)];
  
  // Center the background, if we have to.
  applyPositionStyle(first_bg);

	// Initialize first background.
	$('#bg').css('background-image', "url(" + first_bg+ ")");
	
	// Initialize the first quote
	var first_quote = quotes[Math.floor(Math.random() * quotes.length)];
	$('#quote').text(first_quote);

	// Write the initial time. Every additional write after this is taken care of below.
	writeTime();

	// Listeners on objects (excluding 'body' interestingly) must be setup in the .ready() function.
	nextButtonListener();
  nextButtonHoverAnimate();
});

/*
  Certain images require centering to look normal. If they are listed in the
  centered array, this styling is applied. Otherwise, a default is given.
*/
function applyPositionStyle(next_bg) {
  if($.inArray(next_bg, centered) > -1) {
    $('#bg').css('background-position', 'center');
  } else {
    $('#bg').css('background-position', 'initial');
  }
}

/*
  Fade the next button in the top right of the screen to white when hovered
  over.
*/
function nextButtonHoverAnimate() {
  $('#next').hover(
    function() {
      $(this).animate({opacity: '1'}, 150);
    },
    function() {
      $(this).animate({opacity: '0.4'}, 150);
    });
}

/*
	Each time the element is selected, we cycle to the next background image.
	In the future, should have enough photos to just be random, similar to quote
	selection.
*/
function nextButtonListener() {
	var curr = 1;
	$('#next').click(function() {
  
      // Switch to a random background
      var next_bg = bg[Math.floor(Math.random() * bg.length)];
      
      applyPositionStyle(next_bg);
	  	$('#bg').css('background-image', "url(" + next_bg + ")");
      
      // Switch to a random quote
	  	$('#quote').text(quotes[Math.floor(Math.random() * quotes.length)]);
	});
}

/*
	Every 1 second we play an animation on the colon between hour and minute
	in the display time. We also use this interval to check that the time is
	up to date, constantly writing the most recent time.
*/
var fade = true;
var ctr = 0;
setInterval(function() {
	// Write the time every 2 seconds
	writeTime();
  
  // Update for the first 3 seconds to be safe, because the buttons take time to load
  if (ctr <= 3) {
    updateSocialButtons();
    ctr++;
  }
  
	// Play fading animation on the colon between digits
	if(fade) {
		$('#colon').animate({
			opacity: '0'
		});
		fade = false;
	} else {
		$('#colon').animate({
			opacity: '1'
		});
		fade = true;
	}
}, 1000);

/*
  The social media buttons take time to query their respective websites and
  load properly, so here we use this update function to update multiple
  times in the above interval, and after a reasonable amount of time
  (three seconds should be satisfactory), we can stop.
*/
function updateSocialButtons() {
  $('iframe').css('height', '20px');
  $('iframe').css('width', '100px');
  
  $('body.regular.ltr.ready').css('max-width', '150px');
  
  $('#twitter-widget-0').css({
    'margin-left': '-20px',
    'height': '30px'
  }); // Gross

  $('#twitter-widget-1').css('height', '30px');
}

/*
	This function is responsible for date-time formatting. It will
	select the appropriate elements and set their text to the current
	time values. It is called once, on page load, and then again every
	second by the above interval.
*/
function writeTime() {
	var dt = new Date();
  	var hour = dt.getHours();
  	
  	hour = hour > 12 ? hour - 12 : hour;
  	hour = hour === 0 ? 12 : hour;
  	
  	var minute = dt.getMinutes();
  	minute = minute < 10 ? "0" + minute.toString() : minute;

  	var day = dt.getDate();
  	var month = toStringMonth(dt.getMonth());
  	var year = dt.getFullYear();
  	
  	$('#hour').text(hour);
  	$('#minute').text(minute);
  	$('#date-formatted').text(month + " " + day + " " + year);
}

/*
	A simple switch case to handle numeric-to-string month
	representation, given by the Date() object.
*/
function toStringMonth(month) {
	switch(month) {
		case 0:
			return "January";
		case 1:
			return "February";
		case 2:
			return "March";
		case 3:
			return "April";
		case 4:
			return "May";
		case 5:
			return "June";
		case 6:
			return "July";
		case 7:
			return "August";
		case 8:
			return "September";
		case 9:
			return "October";
		case 10:
			return "November";
		case 11:
			return "December";
	}
}