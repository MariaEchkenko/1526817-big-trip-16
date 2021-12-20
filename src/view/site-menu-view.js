import {MENU_ITEMS} from '../const.js';
import AbstractView from './abstract-view.js';

const activeItem = MENU_ITEMS[0];

const createMenuItemTemplate = () => (
  MENU_ITEMS.map((item) => {
    const activeClass = item === activeItem
      ? 'trip-tabs__btn--active'
      : '';
    return `<a class="trip-tabs__btn  ${activeClass}" href="#">${item}</a>`;
  }).join('')
);

const createSiteMenuTemplate = () => {
  const MenuItemsTemplate = createMenuItemTemplate();

  return `<nav class="trip-controls__trip-tabs  trip-tabs">
    ${MenuItemsTemplate}
</nav>`;
};

export default class SiteMenuView extends AbstractView {
  get template() {
    return createSiteMenuTemplate();
  }
}
