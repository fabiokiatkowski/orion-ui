import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Grid from '../../components/Grid';
import { list, setCurrentRow } from '../../redux/modules/pedidosRecebidos';
import columns from './columns';

const mapStateToProps = state => ({
  data: state.representante.data,
  currentRow: state.representante.currentRow
});

const mapDispatchToProps = dispatch => ({
  list: bindActionCreators(list, dispatch),
  // setCurrentRow: bindActionCreators(setCurrentRow, dispatch)
});

class GridPedidosRecebidos extends Component {
  componentDidMount() {
    this.props.list();
  }

  render() {
    return (
      <Grid
        setCurrentRow={this.props.setCurrentRow}
        minHeight={this.props.minHeight}
        data={this.props.data}
        columns={columns}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GridPedidosRecebidos);
