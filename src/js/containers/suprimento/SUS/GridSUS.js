import React from 'react';
import PropTypes from 'prop-types';

import Grid from '../../../components/Grid';
import columns from './columns';

const GridSUS = (props) => {
  return (
    <Grid
      minHeight={props.minHeight}
      data={props.data}
      columns={columns}
      indexes={[]}
      handleRowChange={props.handleRowChange}
    />
  );
};

GridSUS.propTypes = {
  minHeight: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  handleRowChange: PropTypes.func.isRequired
};

export default GridSUS;
