import dayjs from 'dayjs';

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

//Функция для перемешивания массива
const shuffle = (arr) => {
  let j, temp;
  for (let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random()*(i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
};

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
  const types = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

  const randomIndex = getRandomInteger(0, types.length - 1);
  return types[randomIndex];
};

const generateDestination = () => {
  const destinations = ['Amsterdam', 'Budapest', 'Geneva', 'Berlin', 'Madrid', 'Rome'];

  const randomIndex = getRandomInteger(0, destinations.length - 1);
  return destinations[randomIndex];
};

const descriptions = [
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

const generateDescription = () => {
  const shuffleDescriptions = shuffle(descriptions);

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

const generatePictires = () => {
  const RANDOM_PICTURE_COUNT = getRandomInteger(1, 5);
  const pictures = [];
  for (let i = 1; i <= RANDOM_PICTURE_COUNT; i++) {
    const randomIndex = getRandomInteger(0, 20);
    const picture = {
      src:`http://picsum.photos/300/200?r=${randomIndex}`,
      description:  descriptions[RANDOM_PICTURE_COUNT],
    };
    pictures.push(picture);
  }
  return pictures;
};

const randomOffers = {
  'Taxi': generateOffer(),
  'Bus':  generateOffer(),
  'Train':  generateOffer(),
  'Ship':  generateOffer(),
  'Drive':  generateOffer(),
  'Flight':  generateOffer(),
  'Check-in':  generateOffer(),
  'Sightseeing':  generateOffer(),
  'Restaurant':  generateOffer(),
};

export const generatePoint = () => {
  const type = generateType();
  const dateFrom = generateDate();
  const dateTo = generateDateTo(dateFrom);

  return {
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
