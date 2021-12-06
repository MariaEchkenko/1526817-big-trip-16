import {SORT_ITEMS} from '../const.js';

const isChecked = SORT_ITEMS[0];

const createSortItemTemplate = (items) => (
  items.map((item) => {
    const checked = item === isChecked
      ? 'checked'
      : '';
    return `<div class="trip-sort__item  trip-sort__item--${item.toLowerCase()}">
      <input id="sort-${item.toLowerCase()}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${item.toLowerCase()}" ${checked}>
      <label class="trip-sort__btn" for="sort-${item.toLowerCase()}">${item}</label>
    </div>`;
  }).join('')
);

export const createSortTemplate = () => {
  const SortItemsTemplate = createSortItemTemplate(SORT_ITEMS);
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${SortItemsTemplate}
</form>`;
};
