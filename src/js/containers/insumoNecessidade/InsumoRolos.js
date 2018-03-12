import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Grid from '../../components/Grid';

const InsumoRolos = (props) => {
  return (
    <div className="rolo">
      <Grid
        minHeight={props.minHeight}
        data={props.rolosData}
        indexes={[]}
        handleRowChange={props.handleRowChange}
        gridName="insumoRolos"
      />
    </div>
  );
};

InsumoRolos.propTypes = {
  rolosData: PropTypes.array.isRequired,
  handleRowChange: PropTypes.func,
  minHeight: PropTypes.number.isRequired
};

InsumoRolos.defaultProps = {
  handleRowChange: () => {}
};

const mapStateToProps = state => ({
  rolosData: state.estoque.rolosEmpenhados
});

export default connect(mapStateToProps, null)(InsumoRolos);
