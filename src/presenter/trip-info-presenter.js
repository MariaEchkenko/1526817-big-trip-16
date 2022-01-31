import { render, remove, RenderPosition } from '../utils/render.js';
import TripInfoView from '../view/trip-info-view.js';

export default class TripInfoPresenter {
  #tripInfoContainer = null;
  #pointsModel = null;
  #tripInfoComponent = null;

  constructor(tripInfoContainer, pointsModel) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#tripInfoComponent = new TripInfoView(this.#pointsModel.points);
    render(this.#tripInfoContainer, this.#tripInfoComponent, RenderPosition.AFTERBEGIN);
  }

  destroy = () => {
    remove(this.#tripInfoComponent);

  }
}
