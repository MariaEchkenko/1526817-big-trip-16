import {isFuture, isPast} from '../utils/point.js';

const pointToFilterMap = {
  everything: (points) => points,
  future: (points) => points.filter((point) => isFuture(point.dateFrom)),
  past:(points) => points.filter((point) => isPast(point.dateFrom)),
};

export const generateFilter = (points) => Object.entries(pointToFilterMap).map(
  ([filterName, filtredPoins]) => ({
    name: filterName,
    filtredPoins: filtredPoins(points)
  }),
);
