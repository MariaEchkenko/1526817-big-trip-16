import TripInfoView from './view/trip-info-view.js';
import SiteMenuView from './view/site-menu-view.js';
import StatisticsView from './view/statistics-view.js';
import {render, RenderPosition, remove} from './utils/render.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import {MenuItem} from './const.js';
import ApiService from './api-service.js';

const AUTHORIZATION = 'Basic kkjhgg32rmjnj3';
const END_POINT = 'https://16.ecmascript.pages.academy/big-trip';


const pointsModel = new PointsModel(new ApiService(END_POINT, AUTHORIZATION));

const filterModel = new FilterModel();

const tripMain = document.querySelector('.trip-main');

render(tripMain, new TripInfoView(), RenderPosition.AFTERBEGIN);

const headerControls = tripMain.querySelector('.trip-controls');
const headerNavigation = headerControls.querySelector('.trip-controls__navigation');
const headerFilters = headerControls.querySelector('.trip-controls__filters');
const siteMenuComponent = new SiteMenuView();

const siteMain = document.querySelector('.page-main').firstElementChild;
const mainEvents = siteMain.querySelector('.trip-events');

const tripPresenter = new TripPresenter(mainEvents, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(headerFilters,  filterModel, pointsModel);

let statisticsComponent = null;

const handleTaskNewFormClose = () => {
  siteMenuComponent.setMenuItem(MenuItem.TABLE);
};

const handleSiteMenuClick = (menuItem) => {
  const tableMenuElement = headerNavigation.querySelector(`[data-menu-item="${MenuItem.TABLE}"]`);
  const statsMenuElement = headerNavigation.querySelector(`[data-menu-item="${MenuItem.STATS}"]`);

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

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  handleSiteMenuClick(MenuItem.NEW_EVENT);
});

tripPresenter.init();
filterPresenter.init();

pointsModel.init().finally(() => {
  render(headerNavigation, siteMenuComponent, RenderPosition.BEFOREEND);
  siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
});
