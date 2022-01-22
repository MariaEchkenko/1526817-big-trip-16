import AbstractView from './abstract-view.js';
import {MenuItem} from '../const.js';

const createSiteMenuTemplate = () => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn  trip-tabs__btn--active" data-menu-item="${MenuItem.TABLE}" href="#">${MenuItem.TABLE}</a>
    <a class="trip-tabs__btn" data-menu-item="${MenuItem.STATS}" href="#">${MenuItem.STATS}</a>
  </nav>`
);

export default class SiteMenuView extends AbstractView {

  get template() {
    return createSiteMenuTemplate();
  }

  setMenuClickHandler = (callback) => {
    this._callback.menuClick = callback;
    this.element.addEventListener('click', this.#menuClickHandler);
  }

  setMenuItem = (menuItem) => {
    const item = this.element.querySelector(`[data-menu-item="${menuItem}"]`);
    if (item !== null) {
      item.classList.add('trip-tabs__btn--active');
    }
  }

  #menuClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.menuClick(evt.target.dataset.menuItem);
  }
}
