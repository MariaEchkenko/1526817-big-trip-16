import TripInfoView from './view/trip-info-view.js';
import SiteMenuView from './view/site-menu-view.js';
import {render, RenderPosition} from './utils/render.js';
import {sortDefault} from './utils/point.js';
import {generatePoint} from './mock/point.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';

const EVENT_COUNT = 20;

const points = Array.from({length: EVENT_COUNT}, generatePoint).sort(sortDefault);

const pointsModel = new PointsModel();
pointsModel.points = points;

const filterModel = new FilterModel();

const tripMain = document.querySelector('.trip-main');

render(tripMain, new TripInfoView(), RenderPosition.AFTERBEGIN);

const headerControls = tripMain.querySelector('.trip-controls');
const headerNavigation = headerControls.querySelector('.trip-controls__navigation');
const headerFilters = headerControls.querySelector('.trip-controls__filters');

render(headerNavigation, new SiteMenuView(), RenderPosition.BEFOREEND);


const siteMain = document.querySelector('.page-main');
const mainEvents = siteMain.querySelector('.trip-events');

const tripPresenter = new TripPresenter(mainEvents, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(headerFilters,  filterModel, pointsModel);

tripPresenter.init();
filterPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});
