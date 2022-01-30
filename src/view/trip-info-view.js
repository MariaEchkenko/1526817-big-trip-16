import AbstractView from './abstract-view.js';
import {humanizeTaskDate} from '../utils/point.js';

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
  const startCity = points[0].destination.name;
  const secondCity = points[1].destination.name;
  const endCity = points[points.length - 1].destination.name;

  switch (points.length) {
    case 1:
      return startCity;
    case 2:
      return `${startCity} &mdash; ${endCity}`;
    case 3:
      return `${startCity} &mdash; ${secondCity} &mdash; ${endCity}`;
    default:
      return `${startCity} &mdash; ... &mdash; ${endCity}`;
  }
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
