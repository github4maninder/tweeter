$(document).ready(function() {
  const tweetBox = $('.tweet-box');

  tweetBox.keyup(function() {
    
    const counter = $('.counter');

    counter.text(140 - $(this).val().length);
    if (counter.val() < 0) {
      counter.css('color', 'red');
    } else {
      counter.css('color', 'black');
    }
  });
});