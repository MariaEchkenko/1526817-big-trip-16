import AbstractView from './abstract-view.js';
import {humanizeTaskDate} from '../utils/point.js';

const MAX_DESTINATION_NAMES = 3;

const getTotalPrice = (points) =>
  points.reduce((totalPrice, point) =>
    totalPrice + point.price + point.offers.reduce((totalOffersPrice, {price}) =>
      totalOffersPrice + price, 0), 0);

const getTripDuration = (points) => {
  const startDate = humanizeTaskDate(points[0].dateFrom, 'D MMM');
  const endDate = humanizeTaskDate(points[points.length - 1].dateTo, 'D MMM');
  const durationTrip = `${startDate}&nbsp;&mdash;&nbsp;${endDate}`;
  return durationTrip;
};

const getTripName = (points) => {
  const destinationNames = [];
  points.forEach((point) => destinationNames.push(point.destination.name));
  const route =destinationNames.length > MAX_DESTINATION_NAMES ?
    `${destinationNames[0]} - ... - ${destinationNames[destinationNames.length - 1]}`
    : destinationNames.join(' - ');
  return route;
};

const createTripInfoTemplate = (points) => (
  `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${getTripName(points)}</h1>

      <p class="trip-info__dates">${getTripDuration(points)}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTotalPrice(points)}</span>
    </p>
  </section>`
);

export default class TripInfoView extends AbstractView {
  #points = null;

  constructor(points) {
    super();
    this.#points = points;
  }

  get template() {
    return createTripInfoTemplate(this.#points);
  }
}
