import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import columns from './columns';
import Grid from '../../../../components/Grid';
import { listEstagiosParalelos } from '../../../../redux/modules/tela200';

const mapStateToProps = state => ({
  estagiosParalelos: state.tela200.estagiosParalelos.data
});

const mapDispatchToProps = dispatch => ({
  listEstagiosParalelos: bindActionCreators(listEstagiosParalelos, dispatch)
});

class GridEstagioParalelo extends Component {
  propTypes = {
    listEstagiosParalelos: PropTypes.func.isRequired,
    estagiosParalelos: PropTypes.array,
    ordemProducao: PropTypes.number,
    grupo: PropTypes.string,
    item: PropTypes.string
  };

  defaultProps = {
    estagiosParalelos: [],
    ordemProducao: 0,
    grupo: '',
    item: ''
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ordemProducao !== this.props.ordemProducao
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

GridEstagioParalelo.propTypes = {
  listEstagiosParalelos: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GridEstagioParalelo);
