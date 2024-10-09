'use strict';

var $ = require('jquery');
var throttle = require('lodash.throttle');
// var isMyScriptLoaded = require('./isMyScriptLoaded.js');

module.exports = function() {
  // helper func for detect script is loaded
  function isMyScriptLoaded(url) {
    if (!url) {
      console.log('url in not defined for isMyScriptLoaded');
      return;
    }
    var scripts = document.getElementsByTagName('script');

    for (var i = scripts.length; i--;) {
      if (scripts[i].src === url) {
        return true;
      }
    }
    return false;
  }

  // check videoPlayers on page
  var videoCard = document.querySelector('.videoCard');
  if(!videoCard) return;

  // load yt api
  function loadYTAPI() {
    var firstVideoTag = $('.videoCard').eq(0);

    if($(document).scrollTop() + $(window).height() + 200  >= firstVideoTag.position().top) {
      if (isMyScriptLoaded("https://www.youtube.com/iframe_api")) return;
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      tag.async = true;
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  }

  // define yt video params
  var ytParams = {
    playerVars: {
      // about params here: https://developers.google.com/youtube/player_parameters?playerVersion=HTML5&hl=ru
      autohide: 1,
      controls: 2,
      loop: 1,
      modestbranding: 1,
      rel: 0,
      showinfo: 0
    }
  }

  function onYouTubeIframeAPIReady() {
    // define object for keeping all page players
    var ytPlayers = {};

    // init ytPlayers objects
    var videoCards = document.querySelectorAll('.videoCard__player');

    for (var i = videoCards.length - 1; i >= 0; i--) {
      var sizeProportionCoef = (315 * 100 / 560) / 100,
      vidWidth = videoCards[i].clientWidth,
      vidHeight = vidWidth * sizeProportionCoef,
      vidId = videoCards[i].getAttribute('data-videolink').split('v=')[1],
      elemId = videoCards[i].getAttribute('id').toString();

      ytParams.height = vidHeight;
      ytParams.width = vidWidth;
      ytParams.videoId = vidId;

      ytPlayers[elemId] = new YT.Player(elemId, ytParams);
    }

    window.ytPlayers = ytPlayers;

  }

  loadYTAPI();
  $(document).scroll(throttle(loadYTAPI, 700));
  window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
}
