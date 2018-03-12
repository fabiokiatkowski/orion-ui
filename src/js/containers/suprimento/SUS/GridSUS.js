import React from 'react';
import PropTypes from 'prop-types';
import Grid from '../../../components/Grid';

const GridSUS = (props) => {
  return (
    <Grid
      minHeight={props.minHeight}
      data={props.data}
      indexes={[]}
      handleRowChange={props.handleRowChange}
      gridName="suprimentoSUS"
    />
  );
};

GridSUS.propTypes = {
  minHeight: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  handleRowChange: PropTypes.func.isRequired
};

export default GridSUS;
