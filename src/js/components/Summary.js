import React from 'react';
import PropTypes from 'prop-types';
import NumeralFormat from './NumeralFormat';

const sum = (rowsCount, rowGetter, column) => {
  let result = 0;
  for (let index = 0; index < rowsCount; index += 1) {
    result += rowGetter(index).get(column.key);
  }
  return result;
};

const average = (rowsCount, rowGetter, column) => {
  return rowsCount ? sum(rowsCount, rowGetter, column) / rowsCount : 0;
};

const distinctCount = (rowsCount, rowGetter, column) => {
  const set = new Set([]);
  for (let index = 0; index < rowsCount; index += 1) {
    set.add(rowGetter(index).get(column.key));
  }
  return set.size;
};

const SummaryCount = (props) => {
  return (
    <div>{props.rowsCount}</div>
  );
};

SummaryCount.propTypes = {
  rowsCount: PropTypes.number.isRequired
};

const SummaryDistinctCount = (props) => {
  const { rowsCount, rowGetter, column } = props;

  return (
    <div>{distinctCount(rowsCount, rowGetter, column)}</div>
  );
};

SummaryDistinctCount.propTypes = {
  rowsCount: PropTypes.number.isRequired,
  rowGetter: PropTypes.func.isRequired,
  column: PropTypes.any.isRequired
};

const SummaryAverage = (props) => {
  const { rowsCount, rowGetter, column } = props;

  return (
    <div>{average(rowsCount, rowGetter, column)}</div>
  );
};

SummaryAverage.propTypes = {
  rowsCount: PropTypes.number.isRequired,
  rowGetter: PropTypes.func.isRequired,
  column: PropTypes.any.isRequired
};


const SummarySum = (props) => {
  const { rowsCount, rowGetter, column } = props;
  return (
    <div>
      <NumeralFormat value={sum(rowsCount, rowGetter, column)} />
    </div>
  );
};

SummarySum.propTypes = {
  rowsCount: PropTypes.number.isRequired,
  rowGetter: PropTypes.func.isRequired,
  column: PropTypes.any.isRequired
};

export { SummarySum, SummaryAverage, SummaryCount, SummaryDistinctCount };
