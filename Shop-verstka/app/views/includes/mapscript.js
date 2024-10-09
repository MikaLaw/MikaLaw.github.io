<script>
var head = document.getElementsByTagName('head')[0];
var insertBefore = head.insertBefore;

head.insertBefore = function (newElement, referenceElement) {
  if (newElement.href && newElement.href.indexOf('https://fonts.googleapis.com/css?family=Roboto') === 0) {
    return;
  }
  insertBefore.call(head, newElement, referenceElement);
};

var initMap = function () {
  var coordinates = {
    lat: 55.042241,
    lng: 83.02015
  };


  var markerImage = {
    scaledSize: new google.maps.Size(184, 63),
    url: 'img/components/contactsCard/pin.svg'
  }

	var map = new google.maps.Map(document.getElementById('contactsCardMap'), {
		center: coordinates,
		zoom: 15,
		scrollwheel: false
	})

  var marker = new google.maps.Marker({
    position: coordinates,
    map: map,
    icon: markerImage
  });

	map.setOptions();
}

var mapScript = document.createElement('SCRIPT');
mapScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBsO9dDK3dBryIYu2UpulzQ7VxBDFxAR10&callback=initMap';
document.querySelector('body').appendChild(mapScript);
</script>
