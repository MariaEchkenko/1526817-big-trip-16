export const TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
export const DESTINATIONS = ['Amsterdam', 'Budapest', 'Geneva', 'Berlin', 'Madrid', 'Rome'];
export const MENU_ITEMS = ['Table', 'Stats'];

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past'
};

export const SortType = {
  DEFAULT: 'Day',
  TIME: 'Time',
  PRICE: 'Price',
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};
