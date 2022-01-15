import AbstractView from './abstract-view.js';
import {FilterType} from '../const.js';

const NoPointMessages = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
};


const createNoPointTemplate = (filterType) => {
  const noPointMessagesValue = NoPointMessages[filterType];
  return (
    `<p class="trip-events__msg">${noPointMessagesValue}</p>`
  );
};

export default class NoPointView extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  get template() {
    return createNoPointTemplate(this._data);
  }
}
