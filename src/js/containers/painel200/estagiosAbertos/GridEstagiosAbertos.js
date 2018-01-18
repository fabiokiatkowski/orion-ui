import React from 'react';
import PropsTypes from 'prop-types';
import Grid from '../../../components/Grid';
import columns from './columns';

const GridEstagiosAbertos = (props) => {
  return (
    <Grid
      minHeight={props.minHeight}
      data={props.data}
      columns={columns}
      onRowsSelected={props.onRowsSelected}
      onRowsDeselected={props.onRowsDeselected}
      indexes={props.indexes}
      showCheckbox
    />
  );
};

GridEstagiosAbertos.propTypes = {
  minHeight: PropsTypes.number.isRequired,
  onRowsSelected: PropsTypes.func.isRequired,
  onRowsDeselected: PropsTypes.func.isRequired,
  indexes: PropsTypes.array.isRequired, //eslint-disable-line
  data: PropsTypes.array.isRequired //eslint-disable-line
};

export default GridEstagiosAbertos;
