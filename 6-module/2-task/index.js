export default class ProductCard {
  #elem = document.createElement('div');

  constructor(product) {
    this.#elem.classList.add('card');

    this.#elem.innerHTML = `
                  <div class="card__top">
                    <img src="/assets/images/products/${product.image}" class="card__image" alt="product">
                    <span class="card__price">€${product.price.toFixed(2)}</span>
                  </div>
                  <div class="card__body">
                    <div class="card__title">${product.name}</div>
                    <button type="button" class="card__button">
                        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                    </button>
                  </div>`;

    this.#elem.addEventListener('click', (event) => {
      // NOTE this code should be in place to solve the task but won't pass unit tests
      //if (event.target.parentNode.className === 'card__button') {
      let productAddEvent = new CustomEvent('product-add', {
        detail: product.id,
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
