import TripInfoView from './view/trip-info-view.js';
import SiteMenuView from './view/site-menu-view.js';
import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import ListPointsView from './view/list-points-view.js';
import EventView from './view/event-view.js';
import EditPointFormView from './view/edit-point-view.js';
import NoPointView from './view/no-point-view.js';
import {render, RenderPosition} from './render.js';
import {generatePoint} from './mock/point.js';
import {generateFilter} from './mock/filter.js';

const EVENT_COUNT = 20;

const points = Array.from({length: EVENT_COUNT}, generatePoint);
const filters = generateFilter(points);

const tripMain = document.querySelector('.trip-main');

render(tripMain, new TripInfoView().element, RenderPosition.AFTERBEGIN);

const headerControls = tripMain.querySelector('.trip-controls');
const headerNavigation = headerControls.querySelector('.trip-controls__navigation');
const headerFilters = headerControls.querySelector('.trip-controls__filters');

render(headerNavigation, new SiteMenuView().element, RenderPosition.BEFOREEND);
render(headerFilters,  new FilterView(filters).element, RenderPosition.BEFOREEND);

const siteMain = document.querySelector('.page-main');
const mainEvents = siteMain.querySelector('.trip-events');
const renderPoint = (listPointsElement, point) => {
  const pointComponent = new EventView(point);
  const pointEditComponent = new EditPointFormView(point);

  const replacePointToForm = () => {
    listPointsElement.replaceChild(pointEditComponent.element, pointComponent.element);
  };

  const replaceFormToPoint = () => {
    listPointsElement.replaceChild(pointComponent.element, pointEditComponent.element);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replacePointToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });


  render(listPointsElement, pointComponent.element, RenderPosition.BEFOREEND);
};

const listPointsComponent = new ListPointsView();

render(mainEvents, new SortView().element, RenderPosition.BEFOREEND);

if (points.length === 0) {
  render(mainEvents, new NoPointView('everything').element, RenderPosition.BEFOREEND);
} else {
  render(mainEvents, listPointsComponent.element, RenderPosition.BEFOREEND);

  for (let i = 0; i < EVENT_COUNT; i++) {
    renderPoint(listPointsComponent.element, points[i]);
  }
}

