import React from 'react';
import PropTypes from 'prop-types';

import columns from './columns';
import Grid from '../../../components/Grid';

const GridPeriodos = (props) => {
  return (
    <Grid
      minHeight={props.minHeight}
      data={props.data}
      columns={columns}
      onRowsSelected={props.onRowsSelected}
      onRowsDeselected={props.onRowsDeselected}
      indexes={props.indexes}
      enableSummary
      showCheckbox
    />
  );
};

GridPeriodos.propTypes = {
  onRowsSelected: PropTypes.func.isRequired,
  onRowsDeselected: PropTypes.func.isRequired,
  minHeight: PropTypes.number.isRequired,
  indexes: PropTypes.array.isRequired, //eslint-disable-line
  data: PropTypes.array.isRequired //eslint-disable-line
};

export default GridPeriodos;
