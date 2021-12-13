import {FILTERS} from '../const.js';
import {createElement} from '../render.js';

const createFilterItemTemplate = (filters, isChecked) => (
  filters.map((filterName) => (
    `<div class="trip-filters__filter">
      <input id="filter-${filterName}" class="trip-filters__filter-input  visually-hidden"
        type="radio" name="trip-filter" value="${filterName}"
        ${isChecked ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-${filterName}">${filterName}</label>
    </div>`
  )).join('')
);

const createFilterTemplate = () => {
  const filterItemsTemplate = createFilterItemTemplate(FILTERS);

  return `<form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}

  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`;
};

export default class FilterView {
  #element = null;
  #filters = null

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }

  removeElement() {
    this.#element = null;
  }
}
