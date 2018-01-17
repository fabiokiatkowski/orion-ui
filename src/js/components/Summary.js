import React from 'react';

const sum = (rowsCount, rowGetter, column) => {
  let result = 0;
  for (let index = 0; index < rowsCount; index += 1) {
    result += rowGetter(index)[column.key];
  }
  return result;
};

const average = (rowsCount, rowGetter, column) => {
  return rowsCount ? sum(rowsCount, rowGetter, column) / rowsCount : 0;
};

const distinctCount = (rowsCount, rowGetter, column) => {
  const set = new Set([]);
  for (let index = 0; index < rowsCount; index += 1) {
    set.add(rowGetter(index)[column.key]);
  }
  return set.size;
};

const SummaryCount = (props) => {
  const { rowsCount } = props;

  return (
    <div>
      {rowsCount}
    </div>
  );
};

const SummaryDistinctCount = (props) => {
  const { rowsCount, rowGetter, column } = props;

  return (
    <div>
      {distinctCount(rowsCount, rowGetter, column)}
    </div>
  );
};

const SummaryAverage = (props) => {
  const { rowsCount, rowGetter, column } = props;

  return (
    <div>
      {average(rowsCount, rowGetter, column)}
    </div>
  );
};


const SummarySum = (props) => {
  const { rowsCount, rowGetter, column } = props;

  return (
    <div>
      {sum(rowsCount, rowGetter, column)}
    </div>
  );
};

export { SummarySum, SummaryAverage, SummaryCount, SummaryDistinctCount };

