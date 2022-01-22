import dayjs from 'dayjs';

export const countPointsByType = (points, typeName) => {
  const filteredPoints = points.filter((point) => point.type === typeName);
  return {
    count: filteredPoints.length,
    type: typeName
  };
};

export const countPointsMoney = (points, typeName) => {
  const filteredPoints = points.filter((point) => point.type === typeName);
  return {
    countMoney: filteredPoints.reduce((countMoney, point) => countMoney + point.price, 0),
    type: typeName
  };
};

export const countPointsTime = (points, typeName) => {
  const filteredPoints = points.filter((point) => point.type === typeName);
  return {
    countTime: filteredPoints.reduce((countTime, point) => countTime + dayjs(point.dateTo).diff(point.dateFrom, 'minute'), 0),
    type: typeName
  };
};

