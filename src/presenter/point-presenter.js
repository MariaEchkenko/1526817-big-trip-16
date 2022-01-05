import EventView from '../view/event-view.js';
import EditPointFormView from '../view/edit-point-view.js';
import {render, RenderPosition, replace} from '../utils/render.js';

export  default class PointPresenter {
  #listPointsContainer = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;

  constructor(listPointsContainer) {
    this.#listPointsContainer = listPointsContainer;
  }

  init = (point) => {
    this.#point = point;

    this.#pointComponent = new EventView(point);
    this.#pointEditComponent = new EditPointFormView(point);

    this.#pointComponent.setEditClickHandler(this.#handleEditClick);
    this.#pointEditComponent.setFormCloseHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);

    render(this.#listPointsContainer, this.#pointComponent, RenderPosition.BEFOREEND);
  }

  #replacePointToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  }

  #handleEditClick = () => {
    this.#replacePointToForm();
  }

  #handleFormSubmit = () => {
    this.#replaceFormToPoint();
  }
}
