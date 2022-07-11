import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  #elem;
  #sliderSegmentWidth = 0;
  #config;

  constructor({ steps, value = 0 }) {
    this.#config = { steps, value };

    this.#elem = createElement(`
      <div class="slider">

        <div class="slider__thumb">
          <span class="slider__value">0</span>
        </div>

        <div class="slider__progress"></div>

        <div class="slider__steps"></div>
      </div>
    `);
    this.sliderSteps = this.#elem.querySelector('.slider__steps');
    this.sliderThumb = this.#elem.querySelector('.slider__thumb');
    this.sliderProgress = this.#elem.querySelector('.slider__progress');

    for (let i = 0; i < steps; i++) {
      let newSpan = document.createElement('SPAN');
      if (i === value) {
        newSpan.classList.add('slider__step-active');
        this.sliderSteps.append(newSpan);
        continue;
      }
      this.sliderSteps.append(newSpan);

      this.sliderThumb.style.left = `${value * 100 / steps}%`;
      this.sliderProgress.style.width = `${value * 100 / steps}%`;
    }

    this.mouseClickHandler = this.onMouseClick.bind(this);
    this.#elem.addEventListener('click', this.mouseClickHandler);

    this.sliderThumb.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      this.sliderThumb.ondragstart = () => false;

      this.elem.classList.add('slider_dragging');
      this.pointerMoveHandler = this.onPointerMove.bind(this);
      document.addEventListener('pointermove', this.pointerMoveHandler);

      this.pointerUpHandler = this.onPointerUp.bind(this);
      document.addEventListener('pointerup', this.pointerUpHandler);
    });
  }

  onMouseClick = function(event) {
    if (event.target !== this.sliderThumb) {
      this.#elem.querySelector('.slider__step-active').classList.remove('slider__step-active');

      this.#sliderSegmentWidth = this.#elem.offsetWidth / (this.#config.steps - 1);
      let newActiveIndex = Math.round(event.offsetX / this.#sliderSegmentWidth);
      this.#elem.querySelector('.slider__value').textContent = newActiveIndex;

      let leftPercents = newActiveIndex * this.#sliderSegmentWidth * 100 / this.#elem.offsetWidth;
      this.setStylesBasedOnCurrentWidth(leftPercents);

      this.sliderSteps.children[newActiveIndex].classList.add('slider__step-active');

      let newSliderValueEvent = new CustomEvent('slider-change', {
        detail: newActiveIndex,
        bubbles: true
      });
      this.#elem.dispatchEvent(newSliderValueEvent);
    }
  }

  onPointerMove = function(event) {
    event.preventDefault();
    let currentPosition = this.getCurrentPosition(event);

    let leftPercents = currentPosition * 100 / this.elem.offsetWidth;
    this.setStylesBasedOnCurrentWidth(leftPercents);

    this.#sliderSegmentWidth = this.elem.offsetWidth / (this.#config.steps - 1);
    let newActiveIndex = Math.round(currentPosition / this.#sliderSegmentWidth);
    this.#elem.querySelector('.slider__value').textContent = newActiveIndex;
  }

  onPointerUp = function(event) {
    this.#elem.querySelector('.slider__step-active').classList.remove('slider__step-active');

    this.#sliderSegmentWidth = this.#elem.offsetWidth / (this.#config.steps - 1);
    let newActiveIndex = Math.round(this.getCurrentPosition(event) / this.#sliderSegmentWidth);
    this.#elem.querySelector('.slider__value').textContent = newActiveIndex;

    let leftPercents = newActiveIndex * this.#sliderSegmentWidth * 100 / this.#elem.offsetWidth;
    this.setStylesBasedOnCurrentWidth(leftPercents);

    this.sliderSteps.children[newActiveIndex].classList.add('slider__step-active');

    let newSliderValueEvent = new CustomEvent('slider-change', {
      detail: newActiveIndex,
      bubbles: true
    });
    this.#elem.dispatchEvent(newSliderValueEvent);

    document.removeEventListener('pointermove', this.pointerMoveHandler);
    this.elem.classList.remove('slider_dragging');
    document.removeEventListener('pointerup', this.pointerUpHandler);
  }

  getCurrentPosition(event) {
    return Math.min(Math.max(event.pageX - this.elem.offsetLeft, 0), this.elem.offsetWidth);
  }

  setStylesBasedOnCurrentWidth(percent) {
    this.sliderThumb.style.left = `${percent}%`;
    this.sliderProgress.style.width = `${percent}%`;
  }

  get elem() {
    return this.#elem;
  }
}
