import ListPointsView from '../view/list-points-view.js';
import SortView from '../view/sort-view.js';
import NoPointView from '../view/no-point-view.js';
import {updateItem} from '../utils/common.js';
import {render, RenderPosition} from '../utils/render.js';
import PointPresenter from './point-presenter.js';
import {SortType} from '../const.js';
import {sortTime, sortPrice} from '../utils/point.js';

const EVENT_COUNT = 20;

export default class TripPresenter {
  #listContainer = null;

  #listPointsComponent = new ListPointsView();
  #sortComponent = new SortView();
  #noPointComponent = new NoPointView('everything');

  #listPoints = [];
  #pointPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourcedListPoints = [];

  constructor(listContainer) {
    this.#listContainer = listContainer;
  }

  init = (listPoints) => {
    this.#listPoints = [...listPoints];
    this.#sourcedListPoints = [...listPoints];

    this.#renderTripsList();
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #handlePointChange = (updatedPoint) => {
    this.#listPoints = updateItem(this.#listPoints, updatedPoint);
    this.#sourcedListPoints = updateItem(this.#sourcedListPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.TIME:
        this.#listPoints.sort(sortTime);
        break;
      case SortType.PRICE:
        this.#listPoints.sort(sortPrice);
        break;
      default:
        this.#listPoints = [...this.#sourcedListPoints];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearTripsList();
    this.#renderTripsList();
  }

  #renderSort = () => {
    render(this.#listContainer, this.#sortComponent, RenderPosition.BEFOREEND);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
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
