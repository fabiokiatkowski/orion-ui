import React from 'react';
import PropsTypes from 'prop-types';

import columns from './columns';
import Grid from '../../../components/Grid';

const GridOrdens = (props) => {
  return (
    <Grid
      minHeight={props.minHeight}
      data={props.data}
      columns={columns}
      indexes={props.indexes}
      enableSummary={false}
    />
  );
};

GridOrdens.propTypes = {
  minHeight: PropsTypes.number.isRequired,
  indexes: PropsTypes.array.isRequired, //eslint-disable-line
  data: PropsTypes.array.isRequired //eslint-disable-line
};

export default GridOrdens;
