
import EditPointFormView from '../view/edit-point-view.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import {UserAction, UpdateType} from '../const.js';

export  default class NewPointPresenter {
  #listPointsContainer = null;
  #changeData = null;
  #pointEditComponent = null;
  #destroyCallback = null;
  //#availableOffers = [];
  //#destinations = [];
  #pointModel = null;

  constructor(pointModel, listPointsContainer, changeData) {
    this.#listPointsContainer = listPointsContainer;
    this.#changeData = changeData;
    //this.#availableOffers = availableOffers;
    //this.#destinations = destinations;
    this.#pointModel = pointModel;
  }

  init = (callback) => {
    this.#destroyCallback = callback;

    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new EditPointFormView(this.#pointModel.destinations, this.#pointModel.availableOffers);

    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    render(this.#listPointsContainer, this.#pointEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy = () => {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
    this.destroy();
  }

  #handleDeleteClick = () => {
    this.destroy();
  }
}
