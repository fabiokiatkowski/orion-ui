import React from 'react';
import PropTypes from 'prop-types';
import Grid from '../../../components/Grid';

const GridOrdens = (props) => {
  return (
    <div>
      <Grid
        minHeight={props.minHeight}
        data={props.data}
        indexes={props.indexes}
        handleRowChange={props.handleRowChange}
        enableSummary
        reflectShadowRows={props.reflectShadowRows}
        gridName="tela200ordens"
      />
    </div>
  );
};

GridOrdens.propTypes = {
  handleRowChange: PropTypes.func.isRequired,
  minHeight: PropTypes.number.isRequired,
  indexes: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  reflectShadowRows: PropTypes.func.isRequired
};

export default GridOrdens;
