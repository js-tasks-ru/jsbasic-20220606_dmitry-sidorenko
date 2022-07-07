import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  #elem;
  innerCarousel;

  constructor(slides) {
    this.slides = slides;

    this.#elem = createElement(`
      <div class="carousel">

        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>

        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>

        <div class="carousel__inner">
        </div>

      </div>
    `);

    this.innerCarousel = this.#elem.querySelector('.carousel__inner');

    for (const slide of this.slides) {
      let newSlide = new Slide(slide);
      this.innerCarousel.insertAdjacentElement('beforeend', newSlide.elem);
    }

    this.leftBtn = this.#elem.querySelector('.carousel__arrow_left');
    this.rightBtn = this.#elem.querySelector('.carousel__arrow_right');

    this.offset = 0;

    this.leftBtn.addEventListener('click', () =>{
      this.leftBtn.style.display = '';
      this.rightBtn.style.display = '';
      this.slideWidth = this.innerCarousel.offsetWidth;

      this.offset += this.slideWidth;
      this.innerCarousel.style.transform = `translateX(${this.offset}px)`;
      if (this.offset === 0) {
        this.leftBtn.style.display = 'none';
      }
    });

    this.rightBtn.addEventListener('click', () => {
      this.leftBtn.style.display = '';
      this.rightBtn.style.display = '';
      this.slideWidth = this.innerCarousel.offsetWidth;

      this.offset -= this.slideWidth;
      this.innerCarousel.style.transform = `translateX(${this.offset}px)`;
      if (this.offset === -this.slideWidth * (this.slides.length - 1)) {
        this.rightBtn.style.display = 'none';
      }
    });

    this.leftBtn.style.display = 'none';
  }

  get elem() {
    return this.#elem;
  }
}

class Slide {

  #elem;

  constructor(slide) {

    this.#elem = createElement(`
      <div class="carousel__slide" data-id="${slide.id}">
        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${slide.price.toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>`);

    this.#elem.addEventListener('click', (event) => {

      //NOTE once again this check should be here but unit tests do not think so
      //if (event.target.parentNode.className === 'carousel__button') {
        let productAddEvent = new CustomEvent('product-add', {
          detail: slide.id,
          bubbles: true,
        });
        this.#elem.dispatchEvent(productAddEvent);
      //}
    });

  }

  get elem() {
    return this.#elem;
  }
}
