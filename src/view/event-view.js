import dayjs from 'dayjs';
import {humanizeTaskDate} from '../utils.js';
import {formatConversionTime} from '../utils.js';
import AbstractView from './abstract-view.js';

const createOfferTemplate = (offers) => (
  offers.map(({title, price}) => (
    `<li class="event__offer">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
    </li>`
  )).join('')
);

const createEventTemplate = (point) => {
  const {type, destination, price, isFavorite, offer, dateFrom, dateTo} = point;

  const eventDate = humanizeTaskDate(dateFrom, 'D MMM');
  const startTime = humanizeTaskDate(dateFrom, 'H:mm');
  const endTime = humanizeTaskDate(dateTo, 'H:mm');
  const diffTime = dayjs(dateTo).diff(dateFrom, 'minute');
  const duration = formatConversionTime(diffTime);

  const offersTemplate = createOfferTemplate(offer);

  const favoriteClassName = isFavorite
    ? 'event__favorite-btn--active'
    : '';

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="2019-03-18">${eventDate}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${destination}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">${startTime}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">${endTime}</time>
        </p>
        <p class="event__duration">${duration}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${offersTemplate}
      </ul>
      <button class="event__favorite-btn ${favoriteClassName}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

export default class EventView extends AbstractView {
  #point = null;

  constructor(point) {
    super();
    this.#point = point;
  }

  get template() {
    return createEventTemplate(this.#point);
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  }
}
