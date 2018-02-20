import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { listarEstoqueReferencia } from '../../redux/modules/estoque/estoque';
import { listarInsumoNecessidade } from '../../redux/modules/insumoNecessidade/insumoNecessidade';

import columns from './columns';
import Grid from '../../components/Grid';
import Sizeme from '../../components/Sizeme';

class InsumoNecessidade extends Component {
  state = {
    insumoHeight: 300
  }
  componentDidMount() {
    this.props.listarInsumoNecessidade(this.props.ordemProducao);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.ordemProducao !== this.props.ordemProducao) {
      this.props.listarInsumoNecessidade(nextProps.ordemProducao);
    }
  }
  changeSize = (width, height) => {
    this.setState({ insumoHeight: height });
  }

  handleRowChange = (data) => {
    this.props.listarEstoqueReferencia(data.get('referencia'), true);
  };

  render() {
    const { insumoHeight } = this.state;
    return (
      <div className="insumo-estoque">
        <Sizeme handleChangeSize={this.changeSize}>
          <Grid
            minHeight={insumoHeight}
            columns={columns}
            data={this.props.insumosData}
            indexes={[]}
            handleRowChange={this.handleRowChange}
          />
        </Sizeme>
      </div>
    );
  }
}

InsumoNecessidade.propTypes = {
  insumosData: PropTypes.array.isRequired,
  listarEstoqueReferencia: PropTypes.func.isRequired,
  listarInsumoNecessidade: PropTypes.func.isRequired,
  ordemProducao: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  insumosData: state.insumos.data
});

const mapDispatchToProps = disp => ({
  listarInsumoNecessidade: bindActionCreators(listarInsumoNecessidade, disp),
  listarEstoqueReferencia: bindActionCreators(listarEstoqueReferencia, disp)
});

export default connect(mapStateToProps, mapDispatchToProps)(InsumoNecessidade);
