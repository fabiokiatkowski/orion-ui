import Immutable from 'immutable';

const toImmutableList = (data) => {
  if (!data) {
    return new Immutable.List();
  }
  if (Array.isArray(data)) {
    return Immutable.List.of(...data);
  }
  return data;
};

const isEmptyArray = (obj) => {
  return Array.isArray(obj) && obj.length === 0;
};

export { toImmutableList, isEmptyArray };
