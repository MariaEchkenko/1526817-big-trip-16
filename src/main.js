import SiteMenuView from './view/site-menu-view.js';
import StatisticsView from './view/statistics-view.js';
import {render, RenderPosition, remove} from './utils/render.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import {MenuItem} from './const.js';
import ApiService from './api-service.js';

const AUTHORIZATION = 'Basic kkjhgg32rmjnj3';
const END_POINT = 'https://16.ecmascript.pages.academy/big-trip';

const tripMain = document.querySelector('.trip-main');
const headerControls = tripMain.querySelector('.trip-controls');
const headerNavigation = headerControls.querySelector('.trip-controls__navigation');
const headerFilters = headerControls.querySelector('.trip-controls__filters');
const siteMain = document.querySelector('.page-main').firstElementChild;
const mainEvents = siteMain.querySelector('.trip-events');
const newEventButton = document.querySelector('.trip-main__event-add-btn');

let statisticsComponent = null;

const pointsModel = new PointsModel(new ApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();

const tripInfoPresenter = new TripInfoPresenter(tripMain, pointsModel);
const siteMenuComponent = new SiteMenuView();

const tripPresenter = new TripPresenter(mainEvents, pointsModel, filterModel, tripInfoPresenter);
const filterPresenter = new FilterPresenter(headerFilters,  filterModel, pointsModel);

const handleTaskNewFormClose = () => {
  newEventButton.disabled = false;
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
      newEventButton.disabled = true;
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

newEventButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  handleSiteMenuClick(MenuItem.NEW_EVENT);
});

tripPresenter.init();

pointsModel.init().finally(() => {
  render(headerNavigation, siteMenuComponent, RenderPosition.BEFOREEND);
  siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  tripInfoPresenter.init();
  filterPresenter.init();
});
