import AbstractView from './abstract-view.js';
import {filter as filterFunction} from '../utils/filter.js';

const createFilterItemTemplate = (filter, currentFilterType, points) => {
  const {type, name} = filter;
  const filtredPoints = filterFunction[type](points).length;
  return (
    `<div class="trip-filters__filter">
      <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden"
        type="radio" name="trip-filter" value="${type}"
        ${type === currentFilterType ? 'checked' : ''}
        ${filtredPoints ? '' : 'disabled'}>
      <label class="trip-filters__filter-label" for="filter-${type}">${name}</label>
    </div>`
  );
};

const createFilterTemplate = (filterItems, currentFilterType, points) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType, points))
    .join('') ;

  return `<form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #points = null;

  constructor(filters, currentFilterType, points) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#points = points;
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter, this.#points);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }
}
