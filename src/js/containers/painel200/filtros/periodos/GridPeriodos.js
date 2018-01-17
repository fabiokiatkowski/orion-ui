import React from 'react';
import PropsTypes from 'prop-types';

import columns from './columns';
import Grid from '../../../../components/Grid';

const GridPeriodos = (props) => {
  return (
    <Grid
      setCurrentRow={props.setCurrentRow}
      minHeight={props.minHeight}
      data={props.data}
      columns={columns}
      onRowsSelected={props.onRowsSelected}
      onRowsDeselected={props.onRowsDeselected}
      indexes={props.indexes}
    />
  );
}

GridPeriodos.propTypes = {
  setCurrentRow: PropsTypes.func.isRequired,
  onRowsSelected: PropsTypes.func.isRequired,
  onRowsDeselected: PropsTypes.func.isRequired,
  minHeight: PropsTypes.number.isRequired,
  indexes: PropsTypes.array.isRequired, //eslint-disable-line
  data: PropsTypes.array.isRequired //eslint-disable-line
};

export default GridPeriodos;
