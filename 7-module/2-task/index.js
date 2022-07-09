import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  #elem;
  constructor() {
    this.#elem = createElement(`
      <div class="modal">

        <div class="modal__overlay"></div>

        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>

            <h3 class="modal__title"></h3>
          </div>

          <div class="modal__body"></div>
        </div>

      </div>
    `);

    this.handler = this.closeOnEscapePressed.bind(this);
  }

  get elem() {
    return this.#elem;
  }

  open() {
    document.body.insertAdjacentElement('afterbegin', this.#elem);
    document.body.classList.add('is-modal-open');
    document.addEventListener('keydown', this.handler);
    this.#elem.querySelector('.modal__close').addEventListener('click', () => this.close());
    console.log(document.body.querySelector('.modal'));
  }

  setTitle(modalTitle) {
    this.#elem.querySelector('.modal__title').textContent = modalTitle;
  }

  setBody(modalBody) {
    this.#elem.querySelector('.modal__body').innerHTML = modalBody.outerHTML;
  }

  closeOnEscapePressed(event) {
    if (event.code === 'Escape') {
      this.close();
      document.removeEventListener('keydown', this.handler);
    }
  }

  close() {
    document.querySelector('.modal').remove();
    document.body.classList.remove('is-modal-open');
  }
}
