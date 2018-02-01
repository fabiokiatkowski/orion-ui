import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { listarInsumoNecessidade } from '../../redux/modules/insumoNecessidade/insumoNecessidade';

import columns from './columns';
import Grid from '../../components/Grid';
import Sizeme from '../../components/Sizeme';

class InsumoNecessidade extends Component {
  state = {
    insumoHeight: 300
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.ordemProducao !== nextProps.ordemProducao) {
      this.props.list(nextProps.ordemProducao);
    }
  }

  changeSize = (width, height) => {
    this.setState({ insumoHeight: height });
  }

  render() {
    const { insumoHeight } = this.state;
    return (
      <div className="insumo-estoque">
        <Sizeme handleChangeSize={this.changeSize}>
          <Grid
            minHeight={300}
            columns={columns}
            data={this.props.data}
            indexes={[]}
            handleRowChange={this.handleRowChange}
          />
        </Sizeme>
      </div>
    );
  }
}

InsumoNecessidade.propTypes = {
  data: PropTypes.array.isRequired, //eslint-disable-line
  list: PropTypes.func.isRequired,
  ordemProducao: PropTypes.number
};

InsumoNecessidade.defaultProps = {
  ordemProducao: 0
};

const mapStateToProps = state => ({
  data: state.insumos.data,
});

const mapDispatchToProps = dispatch => ({
  list: bindActionCreators(listarInsumoNecessidade, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(InsumoNecessidade);