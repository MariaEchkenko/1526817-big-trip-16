import {createElement} from '../render.js';
import {MESSAGES} from '../const.js';

const activeFilter = 'everything';

const createNoPointTemplate = () => (
  `<p class="trip-events__msg">${MESSAGES[activeFilter]}</p>`
);

export default class NoPointView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createNoPointTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
