import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { listarInsumoNecessidade } from '../../redux/modules/insumoNecessidade/insumoNecessidade';

import columns from './columns';
import Grid from '../../components/Grid';

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
      <div>
        <Grid
          minHeight={insumoHeight}
          columns={columns}
          data={this.props.data}
          indexes={[]}
          handleRowChange={this.handleRowChange}
        />
        <div className="form-check form-check-inline">
          <input type="checkbox" className="form-check-input" id="checkToReceive" />
          <label className="form-check-label" htmlFor="checkToReceive">Check me out</label>
        </div>
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