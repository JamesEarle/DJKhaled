$(document).ready(function() {
  console.log('ready!');
  
  $('body').css('background-image', "url(img/bg-01.jpg)");
});

var bg = ["img/bg-01.jpg", "img/bg-02.jpg", "img/bg-03.jpg", "img/bg-04.jpg"];
var curr = 1;

$('body').click(function() {
  $(this).css('background-image', "url(" + bg[curr] + ")");
  curr++;
  
  if(curr == 4) curr = 0; // Reset counter
  
});