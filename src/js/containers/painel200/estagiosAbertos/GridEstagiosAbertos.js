import React from 'react';
import PropTypes from 'prop-types';
import Grid from '../../../components/Grid';

const GridEstagiosAbertos = (props) => {
  return (
    <Grid
      minHeight={props.minHeight}
      data={props.data}
      onRowsSelected={props.onRowsSelected}
      onRowsDeselected={props.onRowsDeselected}
      indexes={props.indexes}
      showCheckbox
      gridName="tela200estagiosAbertos"
    />
  );
};

GridEstagiosAbertos.propTypes = {
  minHeight: PropTypes.number.isRequired,
  onRowsSelected: PropTypes.func.isRequired,
  onRowsDeselected: PropTypes.func.isRequired,
  indexes: PropTypes.array.isRequired, //eslint-disable-line
  data: PropTypes.array.isRequired, //eslint-disable-line
};

export default GridEstagiosAbertos;
