
import EditPointFormView from '../view/edit-point-view.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import {availableOffers} from '../mock/offer.js';
import {UserAction, UpdateType} from '../const.js';
import {nanoid} from 'nanoid';

export  default class NewPointPresenter {
  #listPointsContainer = null;
  #changeData = null;
  #pointEditComponent = null;

  constructor(listPointsContainer, changeData) {
    this.#listPointsContainer = listPointsContainer;
    this.#changeData = changeData;
  }

  init = () => {

    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new EditPointFormView(availableOffers);

    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    render(this.#listPointsContainer, this.#pointEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy = () => {
    if (this.#pointEditComponent === null) {
      return;
    }

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
      {id: nanoid(), ...point},
    );
    this.destroy();
  }

  #handleDeleteClick = () => {
    this.destroy();
  }
}
