import {SORT_ITEMS} from '../const.js';
import {createElement} from '../render.js';

const isChecked = SORT_ITEMS[0];

const createSortItemTemplate = () => (
  SORT_ITEMS.map((item) => {
    const checked = item === isChecked
      ? 'checked'
      : '';
    return `<div class="trip-sort__item  trip-sort__item--${item.toLowerCase()}">
      <input id="sort-${item.toLowerCase()}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${item.toLowerCase()}" ${checked}>
      <label class="trip-sort__btn" for="sort-${item.toLowerCase()}">${item}</label>
    </div>`;
  }).join('')
);

const createSortTemplate = () => {
  const SortItemsTemplate = createSortItemTemplate();
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${SortItemsTemplate}
</form>`;
};

export default class SortView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createSortTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
