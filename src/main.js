import TripInfoView from './view/trip-info-view.js';
import SiteMenuView from './view/site-menu-view.js';
import StatisticsView from './view/statistics-view.js';
import {render, RenderPosition, remove} from './utils/render.js';
import {sortDefault} from './utils/point.js';
import {generatePoint} from './mock/point.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import {MenuItem} from './const.js';

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
const siteMenuComponent = new SiteMenuView();

render(headerNavigation, siteMenuComponent, RenderPosition.BEFOREEND);

const siteMain = document.querySelector('.page-main').firstElementChild;
const mainEvents = siteMain.querySelector('.trip-events');

const tripPresenter = new TripPresenter(mainEvents, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(headerFilters,  filterModel, pointsModel);

let statisticsComponent = null;
const tableMenuElement = headerNavigation.querySelector(`[data-menu-item="${MenuItem.TABLE}"]`);
const statsMenuElement = headerNavigation.querySelector(`[data-menu-item="${MenuItem.STATS}"]`);

const handleTaskNewFormClose = () => {
  siteMenuComponent.setMenuItem(MenuItem.TABLE);
};

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_EVENT:
      remove(statisticsComponent);
      filterPresenter.destroy();
      filterPresenter.init();
      tripPresenter.destroy();
      tripPresenter.init();
      statsMenuElement.classList.remove('trip-tabs__btn--active');
      tableMenuElement.classList.add('trip-tabs__btn--active');
      tripPresenter.createPoint(handleTaskNewFormClose);
      break;
    case MenuItem.TABLE:
      filterPresenter.init();
      tripPresenter.init();
      remove(statisticsComponent);
      statsMenuElement.classList.remove('trip-tabs__btn--active');
      tableMenuElement.classList.add('trip-tabs__btn--active');
      break;
    case MenuItem.STATS:
      filterPresenter.destroy();
      tripPresenter.destroy();
      tableMenuElement.classList.remove('trip-tabs__btn--active');
      statsMenuElement.classList.add('trip-tabs__btn--active');
      statisticsComponent = new StatisticsView(pointsModel.points);
      render(siteMain, statisticsComponent, RenderPosition.BEFOREEND);
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

tripPresenter.init();
filterPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  handleSiteMenuClick(MenuItem.NEW_EVENT);
});
