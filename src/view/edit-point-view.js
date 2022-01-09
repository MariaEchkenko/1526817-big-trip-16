import {TYPES, DESTINATIONS} from '../const.js';
import {humanizeTaskDate} from '../utils/point.js';
import SmartView from './smart-view.js';

const BLANK_POINT = {
  type: '',
  destination: '',
  price: null,
  offer: [],
  description: '',
  dateFrom: null,
  dateTo: null
};

const createEventTypeTemplate = (currentType) => (
  TYPES.map((type) => {
    const typeLowerCase = type.toLowerCase();
    return `<div class="event__type-item">
      <input id="event-type-${typeLowerCase}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${typeLowerCase} ${currentType === type ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${typeLowerCase}" for="event-type-${typeLowerCase}-1">${type}</label>
    </div>`;
  }).join('')
);

const createOffersTemplate = (offers, type) => (
  offers.map((offer) => (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-${offer.id}" type="checkbox" name="event-offer-${type}" ${offer.isSelected ? 'checked' : ''}>
      <label class="event__offer-label" for="event-offer-${type}-${offer.id}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`
  )).join('')
);

const createDestinationsTemplate = () => (
  DESTINATIONS.map((destination) => (
    `<option value="${destination}"></option>`
  )).join('')
);


const createEditPointFormTemplate = (point) => {
  const {type, destination, price, offer, description, dateFrom, dateTo} = point;

  const typeTemplate = createEventTypeTemplate();
  const startTime = humanizeTaskDate(dateFrom, 'DD/MM/YY HH:mm');
  const endTime = humanizeTaskDate(dateTo, 'DD/MM/YY HH:mm');
  const offersTemplate = createOffersTemplate(offer, type.toLowerCase());
  const destinationsTemplate = createDestinationsTemplate();

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${typeTemplate}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${destination} list="destination-list-1">
          <datalist id="destination-list-1">
            ${destinationsTemplate}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startTime}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endTime}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${offersTemplate}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${description}</p>
        </section>
      </section>
    </form>
  </li>`;
};

export default class EditPointFormView extends SmartView {

  constructor(point = BLANK_POINT) {
    super();
    this._data = EditPointFormView.parcePointToData(point);
    this.#setInnerHandlers();
  }

  get template() {
    return createEditPointFormTemplate(this._data);
  }

  reset = (point) => {
    this.updateData(
      EditPointFormView.parcePointToData(point)
    );
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormCloseHandler(this._callback.formClose);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  }

  #setInnerHandlers = () => {
    this.element.querySelector('.event__input--price')
      .addEventListener('input', this.#priceInputHandler);
  }

  #priceInputHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      price: evt.target.value,
    }, true);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EditPointFormView.parceDataToPoint(this._data));
  }

  setFormCloseHandler = (callback) => {
    this._callback.formClose = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formCloseHandler);
  }

  #formCloseHandler = (evt) => {
    evt.preventDefault();
    this._callback.formClose(this._data); //проверить
  }

  static parcePointToData = (point) => ({...point});
  static parceDataToPoint = (data) => {
    const point = {...data};
    return point;
  }
}
