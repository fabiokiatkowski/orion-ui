import React from 'react';
import { connect } from 'react-redux';
import PropsTypes from 'prop-types';
import Grid from '../../components/Grid';
import columns from './columns';

const mapStateToProps = state => ({
  data: state.pedidosRecebidos.data
});

const GridPedidosRecebidos = (props) => {
  return (
    <Grid
      minHeight={props.minHeight}
      data={props.data}
      columns={columns}
      handleRowChange={() => {}}
    />
  );
};

GridPedidosRecebidos.propTypes = {
  minHeight: PropsTypes.number.isRequired,
  data: PropsTypes.array.isRequired //eslint-disable-line
};

export default connect(
  mapStateToProps,
  null
)(GridPedidosRecebidos);
