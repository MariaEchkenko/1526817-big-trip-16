import {TYPES} from '../const.js';
import {humanizeTaskDate} from '../utils/point.js';
import SmartView from './smart-view.js';
import flatpickr from 'flatpickr';
import dayjs from 'dayjs';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const BLANK_POINT = {
  type: 'taxi',
  destination: {},
  price: 0,
  offers: [],
  dateFrom: dayjs().toDate(),
  dateTo: dayjs().toDate()
};

let isNewPoint = false;

const createEventTypeTemplate = () => (
  TYPES.map((type) => {
    const typeLowerCase = type.toLowerCase();
    return `<div class="event__type-item">
      <input id="event-type-${typeLowerCase}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${typeLowerCase}>
      <label class="event__type-label  event__type-label--${typeLowerCase}" for="event-type-${typeLowerCase}-1">${type}</label>
    </div>`;
  }).join('')
);

const isOfferChecked = (offer, pointOffers) => {
  const checkedOffers = pointOffers.filter((pointOffer) => offer.id === pointOffer.id).length;
  return checkedOffers;
};

const createOffersTemplate = (availableOffers, pointOffers, type) => (
  availableOffers.map((offer) => (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" data-id ="${offer.id}" id="event-offer-${type}-${offer.id}" type="checkbox" name="event-offer-${type}" ${isOfferChecked(offer, pointOffers) ? 'checked' : ''}>
      <label class="event__offer-label" for="event-offer-${type}-${offer.id}">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`
  )).join('')
);

const createDestinationsTemplate = (allDestinations, type, destination) => (
  `<div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">
      ${type}
    </label>
    <select class="event__input  event__input--destination" id="destination-list-1" name="event-destination">
      ${allDestinations.map(({name}) => `<option value="${name}" ${name === destination.name ? 'selected' : ''}>${name}</option>`).join('')}
    </select>
  </div>`
);

const createPictureTemplate = (pictures = []) => (
  `${pictures.length ? `<div class="event__photos-tape">
    ${pictures.map(({src, description}) => `<img class="event__photo" src=${src} alt="${description}">`).join('')}
  </div>` : ''
  }`
);


const createEditPointFormTemplate = (allDestinations = [], currentTypeOffers = [], point) => {
  const {type, destination, price, offers, dateFrom, dateTo} = point;

  const typeTemplate = createEventTypeTemplate();
  const startTime = humanizeTaskDate(dateFrom, 'DD/MM/YY HH:mm');
  const endTime = humanizeTaskDate(dateTo, 'DD/MM/YY HH:mm');
  const offersTemplate = createOffersTemplate(currentTypeOffers, offers, type.toLowerCase());
  const destinationsTemplate = createDestinationsTemplate(allDestinations, type, destination);
  const picturesTemplate = createPictureTemplate(destination.pictures);

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

        ${destinationsTemplate}

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
          <input class="event__input  event__input--price" id="event-price-1" type="number" min="0" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">${isNewPoint ? 'Cancel' : 'Delete'}</button>
        ${isNewPoint ? '' : `<button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>`}

      </header>
      <section class="event__details">
        ${currentTypeOffers.length ? `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${offersTemplate}
        </div>
      </section>` : ''}

        ${destination ? `<section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destination.description}</p>

          <div class="event__photos-container">
            ${picturesTemplate}
          </div>

        </section>` : ''}
      </section>
    </form>
  </li>`;
};

export default class EditPointFormView extends SmartView {
  #datepickerFrom = null;
  #datepickerTo = null;
  #avialableOffers = null;
  #destinations = null;
  #currentTypeOffers = null;

  constructor(destinations, avialableOffers, point = BLANK_POINT) {
    super();
    this._data = EditPointFormView.parcePointToData(point);

    isNewPoint = point === BLANK_POINT;

    this.#avialableOffers = avialableOffers;
    this.#currentTypeOffers = avialableOffers.filter((offer) => offer.type === this._data.type.toLowerCase())[0].offers;
    this.#destinations = destinations;

    this.#setInnerHandlers();
    this.#setDatepicker();
  }

  get template() {
    return createEditPointFormTemplate(this.#destinations, this.#currentTypeOffers, this._data);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  reset = (point) => {
    this.updateData(
      EditPointFormView.parcePointToData(point)
    );
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormCloseHandler(this._callback.formClose);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  }

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  }

  #setDatepicker = () => {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        defaultDate: this._data.dateFrom,
        onChange: this.#dateFromChangeHandler,
      },
    );
    this.#datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        defaultDate: this._data.dateTo,
        onChange: this.#dateToChangeHandler,
      },
    );

  }

  #dateFromChangeHandler = ([userDateFrom]) => {
    this.updateData({
      dateFrom: userDateFrom,
    });
  }

  #dateToChangeHandler = ([userDateTo]) => {
    this.updateData({
      dateTo: userDateTo,
    });
  }

  #setInnerHandlers = () => {
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceInputHandler);
    this.element.querySelector('.event__type-list').addEventListener('change', this.#typeInputHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationInputHandler);
    this.element.querySelectorAll('.event__offer-checkbox').forEach((input) => input.addEventListener('click', this.#offerInputHandler));
  }

  #priceInputHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      price: evt.target.value,
    }, true);
  }

  #typeInputHandler = (evt) => {
    evt.preventDefault();

    this.#currentTypeOffers = this.#avialableOffers.filter((offer) => offer.type === this._data.type)[0].offers;
    this.updateData({
      type: evt.target.value,
      offers: []
    });
  }

  #destinationInputHandler = (evt) => {
    evt.preventDefault();
    const currentDestination = this.#destinations.filter(({name}) => name === evt.target.value)[0];
    this.updateData({
      destination: currentDestination,
    });
  }


  #offerInputHandler = (evt) => {
    let newCheckedOffers;

    if (this._data.offers.some((offer) => (offer.id === Number(evt.target.dataset.id)))) {
      newCheckedOffers = [...this._data.offers].filter((offer) => (offer.id !== Number(evt.target.dataset.id)));
    } else {
      const checkedOffer = this.#currentTypeOffers.filter((offer) => (offer.id === Number(evt.target.dataset.id)));
      newCheckedOffers = [...this._data.offers].concat(checkedOffer);
    }

    this.updateData({
      offers: newCheckedOffers
    });

  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EditPointFormView.parceDataToPoint(this._data));
  }

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(EditPointFormView.parceDataToPoint(this._data));
  }

  setFormCloseHandler = (callback) => {
    this._callback.formClose = callback;
    if (!isNewPoint) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formCloseHandler);
    }
  }

  #formCloseHandler = (evt) => {
    evt.preventDefault();
    this._callback.formClose();
  }

  static parcePointToData = (point) => ({...point});
  static parceDataToPoint = (data) => {
    const point = {...data};
    return point;
  }
}
