import ListPointsView from '../view/list-points-view.js';
import SortView from '../view/sort-view.js';
import NoPointView from '../view/no-point-view.js';
import EventView from '../view/event-view.js';
import EditPointFormView from '../view/edit-point-view.js';
import {render, RenderPosition, replace} from '../utils/render.js';

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
    const pointComponent = new EventView(point);
    const pointEditComponent = new EditPointFormView(point);

    const replacePointToForm = () => {
      replace(pointEditComponent, pointComponent);
    };

    const replaceFormToPoint = () => {
      replace(pointComponent, pointEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setEditClickHandler(() => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setFormCloseHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setFormSubmitHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });


    render(this.#listPointsComponent, pointComponent, RenderPosition.BEFOREEND);
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
