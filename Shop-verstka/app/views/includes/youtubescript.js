<script>
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var videoPlayer,
  playerNode = document.getElementById('videoPlayer'),
  vidHeight =  playerNode.getAttribute('data-vidheight'),
  vidWidth =  playerNode.getAttribute('data-vidwidth'),
  vidId = playerNode.getAttribute('data-videolink').split('v=')[1];
  
  function onYouTubeIframeAPIReady() {
    videoPlayer = new YT.Player('videoPlayerVideo', {
      height: vidHeight,
      width: vidWidth,
      videoId: vidId,

      playerVars: {
        // https://developers.google.com/youtube/player_parameters?playerVersion=HTML5&hl=ru
        autohide: 1,
        controls: 2,
        loop: 1,
        modestbranding: 1,
        rel: 0,
        showinfo: 0
      }
    });
  }


</script>