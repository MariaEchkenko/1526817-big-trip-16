import dayjs from 'dayjs';
import {nanoid} from 'nanoid';
import {getRandomInteger} from '../utils/common.js';
import {shuffle} from '../utils/common.js';
import {TYPES, DESTINATIONS} from '../const.js';

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

const offerTitles = ['Upgrade to a business class', 'Choose the radio station', 'Order Uber', 'Add luggage', 'Switch to comfort', 'Rent a car', 'Add breakfast'];
const MIN_OFFER_PRICE = 10;
const MAX_OFFER_PRICE = 200;

const generateOffer = () => {
  const RANDOM_OFFER_COUNT = getRandomInteger(0, 5);
  const offers = [];
  for (let i = 1; i <= RANDOM_OFFER_COUNT; i++) {
    const randomIndex = getRandomInteger(0, offerTitles.length - 1);
    const offer = {
      id: i,
      title:  offerTitles[randomIndex],
      price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
    };
    offers.push(offer);
  }
  return offers;
};

const randomOffersTemplate = [];
for (let i = 0; i < TYPES.length; i++) {
  randomOffersTemplate[i] = [TYPES[i], generateOffer()];
}

const randomOffers = Object.fromEntries(randomOffersTemplate);

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

  return {
    id: nanoid(),
    type,
    destination: generateDestination(),
    price: getRandomInteger(0, 1000),
    offer: randomOffers[type],
    pictures: generatePictires(),
    description: generateDescription(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    dateFrom,
    dateTo,
  };
};
