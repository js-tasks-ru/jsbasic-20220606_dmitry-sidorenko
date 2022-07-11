import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {

  #elem;
  #ribbonInner;
  #categories;

  constructor(categories) {
    this.#categories = categories;

    this.#elem = createElement(`
      <div class="ribbon">

        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>

        <nav class="ribbon__inner">
        </nav>

        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);

    this.#ribbonInner = this.#elem.querySelector('.ribbon__inner');

    for (const category of this.#categories) {
      let newCategory = createElement(`
        <a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>
      `);
      if (category.name === 'All') {
        newCategory.classList.add('ribbon__item_active');
      }
      this.#ribbonInner.insertAdjacentElement('beforeend', newCategory);
    }

    const leftButton = this.#elem.querySelector('.ribbon__arrow_left');
    const rightButton = this.#elem.querySelector('.ribbon__arrow_right');

    leftButton.addEventListener('click', () => {
      rightButton.classList.add('ribbon__arrow_visible');
      this.#ribbonInner.scrollBy(-350, 0);
    });
    rightButton.addEventListener('click',() => {
      leftButton.classList.add('ribbon__arrow_visible');
      this.#ribbonInner.scrollBy(350, 0);
    });

    this.#ribbonInner.addEventListener('scroll', () => {
      let scrollLeft = this.#ribbonInner.scrollLeft;
      if (scrollLeft < 1) {
        leftButton.classList.remove('ribbon__arrow_visible');
      }
      if (this.#ribbonInner.scrollWidth - scrollLeft - this.#ribbonInner.clientWidth < 1) {
        rightButton.classList.remove('ribbon__arrow_visible');
      }
    });

    this.#elem.addEventListener('click', (event) => {
      let target = event.target;
      if (target.classList.contains('ribbon__item')) {
        event.preventDefault();
        this.#ribbonInner.querySelector('.ribbon__item_active').classList.remove('ribbon__item_active');
        target.classList.add('ribbon__item_active');
        let newRibbonSelectEvent = new CustomEvent('ribbon-select', {
          detail: target.dataset.id,
          bubbles: true,
        });
        this.#elem.dispatchEvent(newRibbonSelectEvent);
      }
    });
  }

  get elem() {
    return this.#elem;
  }
}
