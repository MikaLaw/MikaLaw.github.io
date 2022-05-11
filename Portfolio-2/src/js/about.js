import { arrowScroll, menu, parallaxScroll, preloader } from "./functions";

let map = () => {
  ymaps.ready(init);
  function init() {
    var myMap = new ymaps.Map("map", {
      center: [54.63436457003265, 39.688799999999986],
      zoom: 12,
      controls: [window.innerWidth > 480 ? "zoomControl" : ""],
    });

    var myPlacemark = new ymaps.Placemark(
      [54.636082787125765, 39.75102628570547],
      {
        hintContent: "Рязань!",
        balloonContent: "",
      },
      {
        iconLayout: "default#image",
        iconImageHref: "../img/icons/map_marker.svg",
        iconImageSize: [30, 42],
        iconImageOffset: [-25, -42],
      }
    );

    myMap.geoObjects.add(myPlacemark);
    if (window.innerWidth > 480) {
      myMap.behaviors.disable("scrollZoom");
      myMap.behaviors.disable("drag");
    }
  }
};

window.onload = () => {
  arrowScroll();
  menu();
  map();
  preloader();
};

window.onscroll = () => {
  parallaxScroll(document.querySelector(".user"), window.pageYOffset, 25);
  parallaxScroll(document.querySelector(".hero__subtitle"), window.pageYOffset, 10);
};
