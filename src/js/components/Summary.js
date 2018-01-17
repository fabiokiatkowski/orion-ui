import React from 'react';

const sum = (rowsCount, rowGetter, column) => {
  let result = 0;
  for (let index = 0; index < rowsCount; index += 1) {
    result += rowGetter(index)[column.key];
  }
  return result;
};

const average = (rowsCount, rowGetter, column) => {
  return rowsCount ? (rowsCount, rowGetter, column) / rowsCount : 0;
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

export { SummarySum, SummaryAverage };

