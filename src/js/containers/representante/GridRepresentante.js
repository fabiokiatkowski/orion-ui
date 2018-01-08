import React from 'react';
import { connect } from 'react-redux';
import PropsTypes from 'prop-types';
import Grid from '../../components/Grid';
import columns from './columns';

const mapStateToProps = state => ({
  data: state.representante.data
});

const GridRepresentante = (props) => {
  return (
    <Grid
      setCurrentRow={props.setCurrentRow}
      minHeight={props.minHeight}
      data={props.data}
      columns={columns}
      handleRowChange={props.handleRowChange}
    />
  );
};

GridRepresentante.propTypes = {
  setCurrentRow: PropsTypes.func.isRequired,
  handleRowChange: PropsTypes.func.isRequired,
  minHeight: PropsTypes.number.isRequired,
  data: PropsTypes.array.isRequired //eslint-disable-line
};

export default connect(mapStateToProps, null)(GridRepresentante);
