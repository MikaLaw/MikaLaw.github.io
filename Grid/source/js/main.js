(function () {
  let footerYear = () => {
    let year = new Date().getFullYear();
    document.querySelector(".footer__copyright-year").innerHTML = year;
  };

  let pageScroll = () => {
    let anchor = document.querySelectorAll('a[data-href^="#"]');

    anchor.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        let reqOffset = document.querySelector(item.getAttribute("data-href")).offsetTop;
        window.scrollTo({
          top: reqOffset,
          behavior: "smooth",
        });
      });
    });
  };

  footerYear();
  pageScroll();
})();
