 // client-end JS function, jQuery is loaded 

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweetArr) {
  for( const tweet of tweetArr) {
    $(`#tweets-container`).prepend(createTweetElement(tweet));
  }
};

// A function to dynamically create HTML/CSS markup to display tweets
const createTweetElement = function(tweetObj) {

  const $tweet = $(`<article class="tweet">
                    <header>
                      <div class='tweet-top-left'>
                        <img class='avatar' src="${tweetObj.user.avatars}" alt="">
                        <h3 class="user-name">${tweetObj.user.name}</h3>
                      </div>
                        <h4 class='handle'>${tweetObj.user.handle}</h4>
                    </header>
                        <p>${escape(tweetObj.content.text)}</p>
                    <footer>
                      <div class="time"><span class="need_to_be_rendered" datetime="${tweetObj.created_at}">${timeago.format(tweetObj.created_at)}</span></div>
                      <div>
                          <a href=""><i class="fas fa-flag"></i></a>
                          <a href=""><i class="fas fa-retweet"></i></a>
                          <a href=""><i class="fas fa-heart"></i></a>
                      </div>
                    </footer>
                  </article>`);

    return $tweet;
}

renderTweets(data);