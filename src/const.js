export const TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
export const DESTINATIONS = ['Amsterdam', 'Budapest', 'Geneva', 'Berlin', 'Madrid', 'Rome'];
export const FILTERS = ['everything', 'future', 'past'];
export const MENU_ITEMS = ['Table', 'Stats'];
export const SortType = {
  DEFAULT: 'Day',
  TIME: 'Time',
  PRICE: 'Price',
};

export const MESSAGES = {
  everything: 'Click New Event to create your first point',
  future: 'There are no future events now',
  past: 'There are no past events now',
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
