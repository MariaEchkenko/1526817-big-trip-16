import {createTripInfoTemplate} from './view/trip-info-view.js';
import {createSiteMenuTemplate} from './view/site-menu-view.js';
import {createFilterTemplate} from './view/filter-view.js';
import {createSortTemplate} from './view/sort-view.js';
import {createListPointsTemplate} from './view/list-points-view.js';
import {createEventTemplate} from './view/event-view.js';
import {createEditPointFormTemplate} from './view/edit-point-view.js';
import {createNewPointTemplate} from './view/add-new-point-view.js';
import {renderTemplate, RenderPosition} from './render.js';

const EVENT_COUNT = 3;

const tripMain = document.querySelector('.trip-main');

renderTemplate(tripMain, createTripInfoTemplate(), RenderPosition.AFTERBEGIN);

const headerControls = tripMain.querySelector('.trip-controls');
const headerNavigation = headerControls.querySelector('.trip-controls__navigation');
const headerFilters = headerControls.querySelector('.trip-controls__filters');

renderTemplate(headerNavigation, createSiteMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(headerFilters, createFilterTemplate(), RenderPosition.BEFOREEND);

const siteMain = document.querySelector('.page-main');
const mainEvents = siteMain.querySelector('.trip-events');

renderTemplate(mainEvents, createSortTemplate(), RenderPosition.BEFOREEND);
renderTemplate(mainEvents, createListPointsTemplate(), RenderPosition.BEFOREEND);

const ListEvents = siteMain.querySelector('.trip-events__list');

renderTemplate(ListEvents, createEditPointFormTemplate(), RenderPosition.AFTERBEGIN);

for (let i = 0; i < EVENT_COUNT; i++) {
  renderTemplate(ListEvents, createEventTemplate(), RenderPosition.BEFOREEND);
}

renderTemplate(ListEvents, createNewPointTemplate(), RenderPosition.BEFOREEND);
