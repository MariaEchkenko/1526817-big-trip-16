import dayjs from 'dayjs';

const HOURS_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;
const MINUTES_IN_DAY = HOURS_IN_DAY * MINUTES_IN_HOUR;

const addZero = (number) => number < 10 ? `0${number}` : number;

// Функция преобразования времени в формат 0D 0HH 0MM, time приходит в минутах
export const formatConversionTime = (time) => {
  const day = Math.floor(time/MINUTES_IN_DAY) > 0
    ? `${addZero(Math.floor(time/MINUTES_IN_DAY))}D`
    : '';
  const hours = Math.floor(time/MINUTES_IN_HOUR) % HOURS_IN_DAY > 0
    ? `${addZero(Math.floor(time/MINUTES_IN_HOUR) % HOURS_IN_DAY)}H`
    : '';
  const minutes = (time % MINUTES_IN_HOUR) > 0
    ? addZero(time % MINUTES_IN_HOUR)
    : '00';
  const formatTime = `${day} ${hours} ${minutes}M`;
  return formatTime;
};

export const humanizeTaskDate = (date, format) => dayjs(date).format(format);
export const isPast = (dateFrom) => dateFrom && dayjs().isAfter(dateFrom, 'D');
export const isFuture = (dateFrom) => dateFrom && dayjs().isBefore(dateFrom, 'D');

export const sortDefault = (pointA, pointB) => pointA.dateFrom - pointB.dateFrom;
export const sortPrice = (pointA, pointB) => pointB.price - pointA.price;
export const sortTime = (pointA, pointB) => dayjs(pointB.dateTo).diff(pointB.dateFrom, 'minute') - dayjs(pointA.dateTo).diff(pointA.dateFrom, 'minute');
