$(document).ready(function() {

	// Initialize first background.
  	$('body').css('background-image', "url(img/bg-01.jpg)");

  	// Write the initial time. Every additional write after this is taken care of below.
  	writeTime();
});

/*
	Each time the element is selected, we cycle to the next background image.
	In the future, should have enough photos to just be random, similar to quote
	selection.
*/
var curr = 1;
$('body').click(function() {

  	$(this).css('background-image', "url(" + bg[curr] + ")");
  	curr++;
  
  	$('#quote').text(quotes[Math.floor(Math.random() * quotes.length)]);

  	// Reset counter
  	if(curr == bg.length) curr = 0;
  
});

/*
	Every 1 second we play an animation on the colon between hour and minute
	in the display time. We also use this interval to check that the time is 
	up to date, constantly writing the most recent time.
*/
var fade = true;
setInterval(function() {
	// Write the time every 2 seconds
	writeTime();

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
	This function is responsible for date-time formatting. It will 
	select the appropriate elements and set their text to the current
	time values. It is called once, on page load, and then again every 
	second by the above interval.
*/
function writeTime() {
	var dt = new Date();
  	var hour = dt.getHours();
  	
  	hour = hour > 12 ? hour - 12 : hour;

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