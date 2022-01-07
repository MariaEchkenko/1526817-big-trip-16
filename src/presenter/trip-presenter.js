import ListPointsView from '../view/list-points-view.js';
import SortView from '../view/sort-view.js';
import NoPointView from '../view/no-point-view.js';
import {updateItem} from '../utils/common.js';
import {render, RenderPosition} from '../utils/render.js';
import PointPresenter from './point-presenter.js';

const EVENT_COUNT = 20;

export default class TripPresenter {
  #listContainer = null;

  #listPointsComponent = new ListPointsView();
  #sortComponent = new SortView();
  #noPointComponent = new NoPointView('everything');

  #listPoints = [];
  #pointPresenter = new Map();

  constructor(listContainer) {
    this.#listContainer = listContainer;
  }

  init = (listPoints) => {
    this.#listPoints = [...listPoints];

    this.#renderTripsList();
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #handlePointChange = (updatedPoint) => {
    this.#listPoints = updateItem(this.#listPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  #renderSort = () => {
    render(this.#listContainer, this.#sortComponent, RenderPosition.BEFOREEND);
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#listPointsComponent, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderPoints = (from, to) => {
    render(this.#listContainer, this.#listPointsComponent, RenderPosition.BEFOREEND);
    for (let i = from; i < to; i++) {
      this.#renderPoint(this.#listPoints[i]);
    }
  }

  #renderNoPoints = () => {
    render(this.#listContainer, this.#noPointComponent, RenderPosition.BEFOREEND);
  }

  #clearTripsList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

  #renderTripsList = () => {
    if (this.#listPoints.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPoints(0, EVENT_COUNT);
  }
}
