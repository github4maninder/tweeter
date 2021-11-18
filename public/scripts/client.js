const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweetObj) {
  const $tweet = $(`<article class="tweet">
                    <header>
                      <div class="tweet-top-left">
                        <img class="avatar" src="${tweetObj.user.avatars}" alt="">
                        <h3 class="user-name">${tweetObj.user.name}</h3>
                      </div>
                      <h4 class="handle">${tweetObj.user.handle}</h4>
                    </header>
                      <p>${escape(tweetObj.content.text)}</p>
                    <footer>
                      <div class="time">
                        <span class="need_to_be_rendered" datetime="${tweetObj.created_at}">${timeago.format(tweetObj.created_at)}
                        </span>
                      </div>
                      <div class="reactions">
                        <a href=""><i class="fas fa-flag"></i></a>
                        <a href=""><i class="fas fa-retweet"></i></a>
                        <a href=""><i class="fas fa-heart"></i></a>
                      </div>
                    </footer>
                    </article>`);

  return $tweet;
};

const renderTweets = function(tweetArr) {
  for (const tweet of tweetArr) {
    $(`#tweets-container`).prepend(createTweetElement(tweet));
  }
};

const loadTweets = function() {
  $.get("/tweets", function(tweetArr) {
    renderTweets(tweetArr);
  });
};

$(document).ready(function() {
  loadTweets();

  $('.new-tweet-link').on('click', function() {
    $('#post-tweet').slideDown("slow");
    $('#post-tweet').css("display", "flex");
  });

  // handles new tweet post
  $('#post-tweet').submit(function(event) {
    event.preventDefault();
    if ($('.error-messages-container *').is(":visible")) {
      $('.error-messages-container *').hide();
    }

    if (!$('#tweet-text').val()) {
      $('#empty-tweet').slideDown("fast");
      return;
    } else if ($('#tweet-text').val().length > 140) {
      $('#too-long').slideDown("fast");
      return;
    }

    const data = $(this).serialize();

    $.ajax({
      method: "POST",
      url: "/tweets",
      data
    }).then(function() {
      $('#tweet-text').val("");
      $('.counter').text(140);
      $('#post-tweet').css("display", "none");
      $('#tweets-container').empty(); // clear the tweets-container
      loadTweets(data);
    });
  });
});