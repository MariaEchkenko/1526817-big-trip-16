import TripInfoView from './view/trip-info-view.js';
import SiteMenuView from './view/site-menu-view.js';
import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import ListPointsView from './view/list-points-view.js';
import EventView from './view/event-view.js';
import EditPointFormView from './view/edit-point-view.js';
import {renderElement, RenderPosition} from './render.js';
import {generatePoint} from './mock/point.js';
import {generateFilter} from './mock/filter.js';

const EVENT_COUNT = 15;

const points = Array.from({length: EVENT_COUNT}, generatePoint);
const filters = generateFilter(points);

const tripMain = document.querySelector('.trip-main');

renderElement(tripMain, new TripInfoView().element, RenderPosition.AFTERBEGIN);

const headerControls = tripMain.querySelector('.trip-controls');
const headerNavigation = headerControls.querySelector('.trip-controls__navigation');
const headerFilters = headerControls.querySelector('.trip-controls__filters');

renderElement(headerNavigation, new SiteMenuView().element, RenderPosition.BEFOREEND);
renderElement(headerFilters,  new FilterView(filters).element, RenderPosition.BEFOREEND);

const siteMain = document.querySelector('.page-main');
const mainEvents = siteMain.querySelector('.trip-events');

const listPointsComponent = new ListPointsView();

renderElement(mainEvents, new SortView().element, RenderPosition.BEFOREEND);
renderElement(mainEvents, listPointsComponent.element, RenderPosition.BEFOREEND);
renderElement(listPointsComponent.element, new EditPointFormView(points[0]).element, RenderPosition.AFTERBEGIN);

for (let i = 1; i < EVENT_COUNT; i++) {
  renderElement(listPointsComponent.element, new EventView(points[i]).element, RenderPosition.BEFOREEND);
}
