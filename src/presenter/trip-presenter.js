import ListPointsView from '../view/list-points-view.js';
import SortView from '../view/sort-view.js';
import NoPointView from '../view/no-point-view.js';
import {remove, render, RenderPosition} from '../utils/render.js';
import PointPresenter from './point-presenter.js';
import {SortType, UpdateType, UserAction} from '../const.js';
import {sortTime, sortPrice} from '../utils/point.js';

export default class TripPresenter {
  #listContainer = null;
  #pointsModel = null;

  #sortComponent = null;
  #currentSortType = SortType.DEFAULT;

  #listPointsComponent = new ListPointsView();
  #noPointComponent = new NoPointView('everything');

  #pointPresenter = new Map();

  constructor(listContainer, pointsModel) {
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModeEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.TIME:{
        return [...this.#pointsModel.points].sort(sortTime);
      }
      case SortType.PRICE:{
        return [...this.#pointsModel.points].sort(sortPrice);
      }
    }

    return this.#pointsModel.points;
  }

  init = () => {
    this.#renderTripsList();
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  #handleModeEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTripsList();
        this.#renderTripsList();
        break;
      case UpdateType.MAJOR:
        this.#clearTripsList();
        this.#renderTripsList({resetSortType: true});
        break;
    }
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;

    this.#clearTripsList();
    this.#renderTripsList();
  }

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    render(this.#listContainer, this.#sortComponent, RenderPosition.BEFOREEND);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #clearSort = () => {
    remove(this.#sortComponent);
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#listPointsComponent, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderPoints = (points) => {
    render(this.#listContainer, this.#listPointsComponent, RenderPosition.BEFOREEND);
    points.forEach((point) => this.#renderPoint(point));
  }

  #renderNoPoints = () => {
    render(this.#listContainer, this.#noPointComponent, RenderPosition.BEFOREEND);
  }

  #clearTripsList = ({resetSortType = false} = {}) => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    this.#clearSort();
    remove(this.#noPointComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #renderTripsList = () => {
    const points = this.points;
    const pointCount = points.length;

    if (pointCount === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPoints(points);
  }
}
