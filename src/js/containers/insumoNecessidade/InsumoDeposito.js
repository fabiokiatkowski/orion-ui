import React from 'react';

import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { listarRolosEmpenhados } from '../../redux/modules/estoque/estoque';

import Grid from '../../components/Grid';

const InsumoDeposito = (props) => {
  const handleRowChange = (data) => {
    props.listarRolosEmpenhados(
      props.estoqueData.referencia,
      data.get('codigoDeposito')
    );
  };
  return (
    <div className="deposito">
      <Grid
        minHeight={props.minHeight}
        data={props.estoqueData.depositos}
        indexes={[]}
        handleRowChange={handleRowChange}
        gridName="insumoDeposito"
      />
    </div>
  );
};

InsumoDeposito.propTypes = {
  estoqueData: PropTypes.array.isRequired,
  listarRolosEmpenhados: PropTypes.func,
  minHeight: PropTypes.number.isRequired
};

InsumoDeposito.defaultProps = ({
  listarRolosEmpenhados: () => {}
});

const mapStateToProps = state => ({
  estoqueData: state.estoque.data
});

const mapDispatchToProps = dispatch => ({
  listarRolosEmpenhados: bindActionCreators(listarRolosEmpenhados, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(InsumoDeposito);
