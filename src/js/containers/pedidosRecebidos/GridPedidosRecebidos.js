import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropsTypes from 'prop-types';
import Grid from '../../components/Grid';
import columns from './columns';

const mapStateToProps = state => ({
  data: state.pedidosRecebidos.data
});

class GridPedidosRecebidos extends Component {
  static propTypes = {
    minHeight: PropsTypes.number.isRequired,
    data: PropsTypes.array.isRequired //eslint-disable-line
  };

  render() {
    return (
      <Grid
        minHeight={this.props.minHeight}
        data={this.props.data}
        columns={columns}
        handleRowChange={() => {}}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(GridPedidosRecebidos);
