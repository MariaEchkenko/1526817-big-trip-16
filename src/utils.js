import dayjs from 'dayjs';

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

//Функция для перемешивания массива
export const shuffle = (arr) => {
  let j, temp;
  for (let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random()*(i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
};

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


