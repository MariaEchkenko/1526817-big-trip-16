import {FilterType} from '../const';
import {isFuture, isPast} from './point.js';

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFuture(point.dateFrom)),
  [FilterType.PAST]:(points) => points.filter((point) => isPast(point.dateFrom)),
};
