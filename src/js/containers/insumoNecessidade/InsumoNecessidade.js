import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { listarEstoqueReferencia } from '../../redux/modules/estoque/estoque';

import columns from './columns';
import Grid from '../../components/Grid';
import Sizeme from '../../components/Sizeme';

class InsumoNecessidade extends Component {
  state = {
    insumoHeight: 300
  }

  changeSize = (width, height) => {
    this.setState({ insumoHeight: height });
  }

  handleRowChange = (data) => {
    this.props.listarEstoqueReferencia(data.referencia, true);
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
  insumosData: PropTypes.array.isRequired, //eslint-disable-line
  listarEstoqueReferencia: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  insumosData: state.insumos.data
});

const mapDispatchToProps = dispatch => ({
  listarEstoqueReferencia: bindActionCreators(listarEstoqueReferencia, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(InsumoNecessidade);
