function initCarousel() {
  const numberOfSlides = 4;
  const leftBtn = document.querySelector('.carousel__arrow_left');
  const rightBtn = document.querySelector('.carousel__arrow_right');
  let innerCarousel = document.querySelector('.carousel__inner');
  const slideWidth = innerCarousel.offsetWidth;
  let offset = 0;

  class CarouselButtonHandler {

    handleEvent(event) {
      leftBtn.style.display = '';
      rightBtn.style.display = '';

      switch (event.currentTarget) {
      case leftBtn:
        offset += slideWidth;
        innerCarousel.style.transform = `translateX(${offset}px)`;
        break;
      case rightBtn:
        offset -= slideWidth;
        innerCarousel.style.transform = `translateX(${offset}px)`;
        break;
      }

      if (offset === 0) {
        leftBtn.style.display = 'none';
      }
      if (offset === -slideWidth * (numberOfSlides - 1)) {
        rightBtn.style.display = 'none';
      }
    }
  }

  let btnHandler = new CarouselButtonHandler();

  leftBtn.addEventListener('click', btnHandler);
  rightBtn.addEventListener('click', btnHandler);

  leftBtn.style.display = 'none';
}
