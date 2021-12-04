import {MENU_ITEMS} from '../const.js';

const activeItem = MENU_ITEMS[0];

const createMenuItemTemplate = (items) => (
  items.map((item) => {
    const activeClass = item === activeItem
      ? 'trip-tabs__btn--active'
      : '';
    return `<a class="trip-tabs__btn  ${activeClass}" href="#">${item}</a>`;
  }).join('')
);

export const createSiteMenuTemplate = () => {
  const MenuItemsTemplate = createMenuItemTemplate(MENU_ITEMS);

  return `<nav class="trip-controls__trip-tabs  trip-tabs">
    ${MenuItemsTemplate}
</nav>`;
};
