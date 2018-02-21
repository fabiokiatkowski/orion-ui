import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import columns from './columns';
import Grid from '../../../../components/Grid';
import { listarLogUti } from '../../../../redux/modules/tela200';

const mapStateToProps = state => ({
  data: state.tela200.logUti.data
});

const mapDispatchToProps = dispatch => ({
  listarLogUti: bindActionCreators(listarLogUti, dispatch),
});

class GridLogUti extends Component {
  componentDidMount() {
    this.props.listarLogUti(this.props.ordemProducao);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.ordemProducao !== this.props.ordemProducao) {
      this.props.listarLogUti(nextProps.ordemProducao);
    }
  }

  render() {
    return (
      <Grid
        minHeight={this.props.minHeight}
        data={this.props.data}
        columns={columns}
        indexes={[]}
      />
    );
  }
}

GridLogUti.propTypes = {
  listarLogUti: PropTypes.func.isRequired,
  data: PropTypes.array,
  ordemProducao: PropTypes.number
};

GridLogUti.defaultProps = {
  data: [],
  ordemProducao: 0
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GridLogUti);
