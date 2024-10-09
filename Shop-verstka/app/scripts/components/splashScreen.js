'use strict';

var $ = require('jquery');

module.exports = function () {
  // логика для кнопки плея-паузы видео на сплэш-скрине
  $('body').on('click', '.js-splashScreen__videoController', function () {
    if (!window.splashPlayer) {
      return;
    }

    var videoStateCode = window.splashPlayer.getPlayerState();

    switch (videoStateCode) {
      case 1:
        $(this).removeClass('isPlaying');
        $(this).addClass('isOnPause');
        window.splashPlayer.pauseVideo();
        break;

      case 2:
        $(this).addClass('isPlaying');
        $(this).removeClass('isOnPause');
        window.splashPlayer.playVideo();
        break;

      default:
        break;
    }
  });

  // видео с youtube на фон
  var tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  var firstScriptTag = document.getElementsByTagName('script')[0];
  var splashScreenElement = document.querySelector('#splash');

  document.addEventListener('DOMContentLoaded', function () {
    if (window.innerWidth > 1270 && splashScreenElement) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  });

  window.onYouTubeIframeAPIReady = function () {
    window.splashPlayer = new YT.Player('splash', {
      height: window.innerHeight,
      width: window.innerWidth,

      videoId: 'xEyYgc3UivY',
      playerVars: {
        // about params here: https://developers.google.com/youtube/player_parameters?playerVersion=HTML5&hl=ru
        autoplay: 1,
        disablekb: 1,
        fs: 0,
        controls: 0,
        // playlist: 'xEyYgc3UivY',
        // loop: 1,
        modestbranding: 1,
        mute: 1,
        rel: 0,
        showinfo: 0,
        playsinline: 1,
      },
      allowfullscreen: 1,
      events: {
        onStateChange:
          function (e) {
            // if (e.data === 1) {}
            if (e.data === YT.PlayerState.ENDED) {
              window.splashPlayer.playVideo();
            }
          }
      }
    });
  };

  // логика для кнопки «вниз»
  $('body').on('click', '.js-splashScreen__nextBtn', function () {
    var $splashScreen = $(this).parents('#mainSplash');
    var $nextToSplash = $splashScreen.next();
    var mobileDashboardHeight = $('.mobileDashboard').height();

    $('html, body').animate({
      scrollTop: $nextToSplash.offset().top - mobileDashboardHeight
    }, 1000);
  });
};
