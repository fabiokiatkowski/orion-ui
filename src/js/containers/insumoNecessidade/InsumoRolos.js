import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Grid from '../../components/Grid';
import columns from './columnsRolos';

const InsumoRolos = (props) => {
  return (
    <div className="rolo">
      <Grid
        minHeight={props.minHeight}
        columns={columns}
        data={props.rolosData}
        indexes={[]}
        handleRowChange={props.handleRowChange}
      />
    </div>
  );
};

InsumoRolos.propTypes = {
  rolosData: PropTypes.array.isRequired,
  handleRowChange: PropTypes.func
};

InsumoRolos.defaultProps = {
  handleRowChange: () => {}
};

const mapStateToProps = state => ({
  rolosData: state.estoque.rolosEmpenhados
});

export default connect(mapStateToProps, null)(InsumoRolos);
