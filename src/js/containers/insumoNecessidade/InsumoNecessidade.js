import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { listarEstoqueReferencia } from '../../redux/modules/estoque/estoque';
import { listarInsumoNecessidade } from '../../redux/modules/insumoNecessidade/insumoNecessidade';

import Grid from '../../components/Grid';

class InsumoNecessidade extends Component {
  componentDidMount() {
    this.props.listarInsumoNecessidade(this.props.ordemProducao);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.ordemProducao !== this.props.ordemProducao) {
      this.props.listarInsumoNecessidade(nextProps.ordemProducao);
    }
  }
  handleRowChange = (data) => {
    this.props.listarEstoqueReferencia(data.get('referencia'), true);
  };

  render() {
    return (
      <div className="insumo-estoque">
        <Grid
          minHeight={this.props.minHeight}
          data={this.props.insumosData}
          indexes={[]}
          handleRowChange={this.handleRowChange}
          gridName="insumoNecessidade"
        />
      </div>
    );
  }
}

InsumoNecessidade.propTypes = {
  insumosData: PropTypes.array.isRequired,
  listarEstoqueReferencia: PropTypes.func.isRequired,
  listarInsumoNecessidade: PropTypes.func.isRequired,
  ordemProducao: PropTypes.number.isRequired,
  minHeight: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  insumosData: state.insumos.data
});

const mapDispatchToProps = disp => ({
  listarInsumoNecessidade: bindActionCreators(listarInsumoNecessidade, disp),
  listarEstoqueReferencia: bindActionCreators(listarEstoqueReferencia, disp)
});

export default connect(mapStateToProps, mapDispatchToProps)(InsumoNecessidade);
