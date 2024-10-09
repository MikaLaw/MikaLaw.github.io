<script>
  WebFontConfig = {
    google: {
      families: [
        'Open Sans:400,600,700,400italic:cyrillic,latin',
      ]
    },
    active: function(familyName, fvd) {
      document.getElementsByTagName('BODY')[0].className += ' fontLoaded';
    }
  };

  (function(d) {
    var wf = d.createElement('script'), s = d.scripts[0];
    wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
    wf.async = true;
    s.parentNode.insertBefore(wf, s);
  })(document);
</script>
