import React from 'react';
import PropTypes from 'prop-types';

import Grid from '../../../components/Grid';
import columns from './columns';

const GridAvance = (props) => {
  return (
    <Grid
      minHeight={props.minHeight}
      data={props.data}
      columns={columns}
      indexes={[]}
    />
  );
};

GridAvance.propTypes = {
  minHeight: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired
};

export default GridAvance;
