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

const generateDate = () => {
  const maxMinutesGap = 30*24*60;
  const daysGap = getRandomInteger(-maxMinutesGap, maxMinutesGap);
  return dayjs().add(daysGap, 'minute').toDate();
};

const generateDateTo = (dateFrom) => {
  const minutesGap = getRandomInteger(1, 24*60);
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


export const generatePoint = () => {
  const type = generateType();
  const dateFrom = generateDate();
  const dateTo = generateDateTo(dateFrom);
  const offers = AvailableOffers[type];
  offers.forEach((offer) => {
    offer.isSelected = Boolean(getRandomInteger(0, 1));
  });

  return {
    id: nanoid(),
    type,
    destination: generateDestination(),
    price: getRandomInteger(0, 1000),
    offers,
    pictures: generatePictires(),
    description: generateDescription(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    dateFrom,
    dateTo,
  };
};
