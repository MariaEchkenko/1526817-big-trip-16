import ListPointsView from '../view/list-points-view.js';
import SortView from '../view/sort-view.js';
import NoPointView from '../view/no-point-view.js';
import {render, RenderPosition} from '../utils/render.js';
import PointPresenter from './point-presenter.js';

const EVENT_COUNT = 20;

export default class TripPresenter {
  #listContainer = null;

  #listPointsComponent = new ListPointsView();
  #sortComponent = new SortView();
  #noPointComponent = new NoPointView('everything');

  #listPoints = [];

  constructor(listContainer) {
    this.#listContainer = listContainer;
  }

  init = (listPoints) => {
    this.#listPoints = [...listPoints];

    this.#renderTripsList();
  }

  #renderSort = () => {
    render(this.#listContainer, this.#sortComponent, RenderPosition.BEFOREEND);
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#listPointsComponent);
    pointPresenter.init(point);
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

  #renderTripsList = () => {
    if (this.#listPoints.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPoints(0, EVENT_COUNT);
  }
}
