import dayjs from 'dayjs';

// Функция преобразования времени в формат 0D 0HH 0MM, time приходит в минутах
export const formatConversionTime = (time) => { //TODO допилить для случая, когда дни > 0, а минуты = 0
  const day = Math.floor(time/1440) > 0
    ? `${Math.floor(time/1440)}D`
    : '';
  const minutes = (time % 60) > 0
    ? time % 60
    : '00';
  const hours = (time - minutes)/60 > 0
    ? `${(time - minutes)/60}H`
    : '';
  const formatTime = `${day} ${hours} ${minutes}M`;
  return formatTime;
};

export const humanizeTaskDate = (date, format) => dayjs(date).format(format);
export const isPast = (dateFrom) => dateFrom && dayjs().isAfter(dateFrom, 'D');
export const isFuture = (dateFrom) => dateFrom && dayjs().isBefore(dateFrom, 'D');

export const sortDefault = (pointA, pointB) => pointA.dateFrom - pointB.dateFrom;
export const sortPrice = (pointA, pointB) => pointB.price - pointA.price;
export const sortTime = (pointA, pointB) => dayjs(pointB.dateTo).diff(pointB.dateFrom, 'minute') - dayjs(pointA.dateTo).diff(pointA.dateFrom, 'minute');
