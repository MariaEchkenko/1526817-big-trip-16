import dayjs from 'dayjs';
import {nanoid} from 'nanoid';
import {getRandomInteger} from '../utils/common.js';
import {shuffle} from '../utils/common.js';
import {TYPES, DESTINATIONS} from '../const.js';
import {AvailableOffers} from './offer.js';

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
  'Cras aliquet varius magna, non porta ligula feugiat eget. ',
  'Fusce tristique felis at fermentum pharetra. ',
  'Aliquam id orci ut lectus varius viverra. ',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. ',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. ',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. ',
  'Sed sed nisi sed augue convallis suscipit in sed felis. ',
  'Aliquam erat volutpat. ',
  'Nunc fermentum tortor ac porta dapibus. ',
  'In rutrum ac purus sit amet tempus. '
];
const SRC = 'http://picsum.photos/300/200?r=';

const MAX_MINUTES_GAP = 43200; //30 дней в минутах 30*24*60
const MAX_DIFF_MINUTES = 1440; // сутки в минутах 24*60

const generateDate = () => {
  const daysGap = getRandomInteger(-MAX_MINUTES_GAP, MAX_MINUTES_GAP);
  return dayjs().add(daysGap, 'minute').toDate();
};

const generateDateTo = (dateFrom) => {
  const minutesGap = getRandomInteger(1, MAX_DIFF_MINUTES);
  return dayjs(dateFrom).add(minutesGap, 'minute').toDate();
};

const generateType = () => {
  const randomIndex = getRandomInteger(0, TYPES.length - 1);
  return TYPES[randomIndex];
};

const generateDestination = () => {
  const randomIndex = getRandomInteger(0, DESTINATIONS.length - 1);
  return DESTINATIONS[randomIndex];
};

const generateDescription = () => {
  const shuffleDescriptions = shuffle(DESCRIPTIONS);

  const randomIndex = getRandomInteger(1, 5);
  const description = shuffleDescriptions.slice(0, randomIndex).join('');
  return description;
};

const generatePictires = () => {
  const RANDOM_PICTURE_COUNT = getRandomInteger(1, 5);
  const pictures = [];
  for (let i = 1; i <= RANDOM_PICTURE_COUNT; i++) {
    const randomIndex = getRandomInteger(0, 20);
    const picture = {
      src:  SRC + randomIndex,
      description:  DESCRIPTIONS[RANDOM_PICTURE_COUNT],
    };
    pictures.push(picture);
  }
  return pictures;
};

const createRandomDestinations = (city) => (
  {
    name: city,
    description: generateDescription(),
    pictures: generatePictires()
  }
);

export const destinationsData = DESTINATIONS.map((city) => createRandomDestinations(city));

export const generatePoint = () => {
  const type = generateType();
  const destination = generateDestination();
  const description = destinationsData.filter(({name}) => name === destination);
  const dateFrom = generateDate();
  const dateTo = generateDateTo(dateFrom);
  const offers = AvailableOffers[type].slice(0, getRandomInteger(0, AvailableOffers[type].length));

  return {
    id: nanoid(),
    type,
    destination,
    price: getRandomInteger(0, 1000),
    offers,
    description: description[0],
    isFavorite: Boolean(getRandomInteger(0, 1)),
    dateFrom,
    dateTo,
  };
};
