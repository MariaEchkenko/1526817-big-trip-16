import {createElement} from '../render.js';
import {MESSAGES} from '../const.js';


const createNoPointTemplate = (activeFilter) => (
  `<p class="trip-events__msg">${MESSAGES[activeFilter]}</p>`
);

export default class NoPointView {
  #element = null;
  #activeFilter;

  constructor(activeFilter) {
    this.#activeFilter = activeFilter;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createNoPointTemplate(this.#activeFilter);
  }

  removeElement() {
    this.#element = null;
  }
}
