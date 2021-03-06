import ListPointsView from '../view/list-points-view.js';
import SortView from '../view/sort-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter, {State as PointPresenterViewState} from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import LoadingView from '../view/loading-view.js';
import {remove, render, RenderPosition} from '../utils/render.js';
import {SortType, UpdateType, UserAction, FilterType} from '../const.js';
import {sortDefault, sortTime, sortPrice} from '../utils/point.js';
import {filter} from '../utils/filter.js';

export default class TripPresenter {
  #listContainer = null;
  #pointsModel = null;
  #filterModel = null;

  #sortComponent = null;
  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.EVERYTHING;

  #listPointsComponent = new ListPointsView();
  #loadingComponent = new LoadingView();
  #noPointComponent = null;

  #pointPresenter = new Map();
  #newPointPresenter = null;
  #tripInfoPresenter = null;
  #isLoading = true;

  constructor(listContainer, pointsModel, filterModel, tripInfoPresenter) {
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#tripInfoPresenter = tripInfoPresenter;
    this.#newPointPresenter = new NewPointPresenter(this.#pointsModel, this.#listPointsComponent, this.#handleViewAction);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DEFAULT:{
        return filteredPoints.sort(sortDefault);
      }
      case SortType.TIME:{
        return filteredPoints.sort(sortTime);
      }
      case SortType.PRICE:{
        return filteredPoints.sort(sortPrice);
      }
    }

    return filteredPoints;
  }

  get availableOffers() {
    const availableOffers = this.#pointsModel.availableOffers;
    return availableOffers;
  }

  get destinations() {
    const destinations = this.#pointsModel.destinations;
    return destinations;
  }

  init = () => {
    this.#pointsModel.addObserver(this.#handleModeEvent);
    this.#filterModel.addObserver(this.#handleModeEvent);
    this.#currentSortType = SortType.DEFAULT;
    this.#renderTripsList();
  }

  destroy = () => {
    this.#clearTripsList(true);
    remove(this.#listPointsComponent);

    this.#pointsModel.removeObserver(this.#handleModeEvent);
    this.#filterModel.removeObserver(this.#handleModeEvent);
  }

  createPoint = (callback) => {
    this.#newPointPresenter.init(callback);
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #handleViewAction = async (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenter.get(update.id).setViewState(PointPresenterViewState.SAVING);
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenter.get(update.id).setViewState(PointPresenterViewState.ABORTING);
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenter.get(update.id).setViewState(PointPresenterViewState.DELETING);
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenter.get(update.id).setViewState(PointPresenterViewState.ABORTING);
        }
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
        this.#tripInfoPresenter.destroy();
        this.#tripInfoPresenter.init();
        break;
      case UpdateType.MAJOR:
        this.#clearTripsList();
        this.#renderTripsList({resetSortType: true});
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderTripsList();
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
    const pointPresenter = new PointPresenter(this.availableOffers,this.destinations, this.#listPointsComponent, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderPoints = (points) => {
    render(this.#listContainer, this.#listPointsComponent, RenderPosition.BEFOREEND);
    points.forEach((point) => this.#renderPoint(point));
  }

  #renderLoading = () => {
    render(this.#listContainer, this.#loadingComponent, RenderPosition.AFTERBEGIN);
  }

  #renderNoPoints = () => {
    this.#noPointComponent = new NoPointView(this.#filterType);
    render(this.#listContainer, this.#noPointComponent, RenderPosition.BEFOREEND);
  }

  #clearTripsList = ({resetSortType = false} = {}) => {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    this.#clearSort();
    remove(this.#loadingComponent);
    remove(this.#noPointComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #renderTripsList = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const points = this.points;
    const pointCount = points.length;

    if (pointCount === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#clearSort();
    this.#renderSort();
    this.#renderPoints(points);
  }
}
