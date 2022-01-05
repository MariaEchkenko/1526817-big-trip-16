import TripInfoView from './view/trip-info-view.js';
import SiteMenuView from './view/site-menu-view.js';
import FilterView from './view/filter-view.js';
import {render, RenderPosition} from './utils/render.js';
import {generatePoint} from './mock/point.js';
import {generateFilter} from './mock/filter.js';
import TripPresenter from './presenter/trip-presenter.js';

const EVENT_COUNT = 0;

const points = Array.from({length: EVENT_COUNT}, generatePoint);
const filters = generateFilter(points);

const tripMain = document.querySelector('.trip-main');

render(tripMain, new TripInfoView(), RenderPosition.AFTERBEGIN);

const headerControls = tripMain.querySelector('.trip-controls');
const headerNavigation = headerControls.querySelector('.trip-controls__navigation');
const headerFilters = headerControls.querySelector('.trip-controls__filters');

render(headerNavigation, new SiteMenuView(), RenderPosition.BEFOREEND);
render(headerFilters,  new FilterView(filters), RenderPosition.BEFOREEND);

const siteMain = document.querySelector('.page-main');
const mainEvents = siteMain.querySelector('.trip-events');

const tripPresenter = new TripPresenter(mainEvents);
tripPresenter.init(points);

