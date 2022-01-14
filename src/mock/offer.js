import {getRandomInteger} from '../utils/common.js';
import {TYPES} from '../const.js';

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
      price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE),
      isSelected: false,
    };
    offers.push(offer);
  }
  return offers;
};

const randomOffersTemplate = [];
for (let i = 0; i < TYPES.length; i++) {
  randomOffersTemplate[i] = [TYPES[i], generateOffer()];
}

export const AvailableOffers = Object.fromEntries(randomOffersTemplate);
