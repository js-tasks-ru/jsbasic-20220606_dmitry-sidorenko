import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  #elem;
  #sliderSegmentWidth = 0;
  constructor({ steps, value = 0 }) {
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

    this.#elem.addEventListener('click', (event) => {
      this.#elem.querySelector('.slider__step-active').classList.remove('slider__step-active');

      this.#sliderSegmentWidth = this.#elem.offsetWidth / (steps - 1);
      let newActiveIndex = Math.round(event.offsetX / this.#sliderSegmentWidth);
      this.#elem.querySelector('.slider__value').textContent = newActiveIndex;

      let leftPercents = newActiveIndex * this.#sliderSegmentWidth * 100 / this.#elem.offsetWidth;
      this.sliderThumb.style.left = `${leftPercents}%`;
      this.sliderProgress.style.width = `${leftPercents}%`;

      this.sliderSteps.children[newActiveIndex].classList.add('slider__step-active');

      let newSliderValueEvent = new CustomEvent('slider-change', {
        detail: newActiveIndex,
        bubbles: true
      });
      this.#elem.dispatchEvent(newSliderValueEvent);
    });
  }

  get elem() {
    return this.#elem;
  }
}
