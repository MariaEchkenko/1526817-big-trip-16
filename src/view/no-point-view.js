import AbstractView from './abstract-view.js';
import {MESSAGES} from '../const.js';


const createNoPointTemplate = (activeFilter) => (
  `<p class="trip-events__msg">${MESSAGES[activeFilter]}</p>`
);

export default class NoPointView extends AbstractView {
  #activeFilter;

  constructor(activeFilter) {
    super();
    this.#activeFilter = activeFilter;
  }

  get template() {
    return createNoPointTemplate(this.#activeFilter);
  }
}
