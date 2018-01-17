import React from 'react';
import PropsTypes from 'prop-types';
import Grid from '../../../../components/Grid';
import columns from './columns';

const GridEstagiosAbertos = (props) => {
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
};

GridEstagiosAbertos.propTypes = {
  setCurrentRow: PropsTypes.func.isRequired,
  minHeight: PropsTypes.number.isRequired,
  data: PropsTypes.array.isRequired //eslint-disable-line
};

export default GridEstagiosAbertos;
