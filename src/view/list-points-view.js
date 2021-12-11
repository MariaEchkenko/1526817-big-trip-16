import {createElement} from '../render.js';


const createListPointsTemplate = () => (
  `<ul class="trip-events__list">
  </ul>`
);

export default class ListPointsView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createListPointsTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
