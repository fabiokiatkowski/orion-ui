import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import columns from './columns';
import Grid from '../../../../components/Grid';
import { listarEstagiosParalelos } from '../../../../redux/modules/tela200';

const mapStateToProps = state => ({
  estagiosParalelos: state.tela200.estagiosParalelos.data
});

const mapDispatchToProps = dispatch => ({
  listEstagiosParalelos: bindActionCreators(listarEstagiosParalelos, dispatch)
});

class GridFilhos extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.ordemProducao !== this.props.ordemProducao
      || nextProps.ordemPrincipal !== this.props.ordemPrincipal
      || nextProps.grupo !== this.props.grupo
      || nextProps.item !== this.props.item) {
      this.props.listEstagiosParalelos(
        nextProps.ordemProducao,
        nextProps.grupo,
        nextProps.item
      );
    }
  }

  render() {
    return (
      <Grid
        minHeight={300}
        data={this.props.estagiosParalelos}
        columns={columns}
        indexes={[]}
      />
    );
  }
}


GridFilhos.propTypes = {
  listEstagiosParalelos: PropTypes.func.isRequired,
  estagiosParalelos: PropTypes.array,
  ordemProducao: PropTypes.number,
  ordemPrincipal: PropTypes.number,
  grupo: PropTypes.string,
  item: PropTypes.string
};

GridFilhos.defaultProps = {
  estagiosParalelos: [],
  ordemProducao: 0,
  ordemPrincipal: 0,
  grupo: '',
  item: ''
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GridFilhos);
