import React from 'react';
import { connect } from 'react-redux';
import PropsTypes from 'prop-types';
import Grid from '../../components/Grid';
import columns from './columns';
import ColumnPersist from '../../utils/gridColumns';

const mapStateToProps = state => ({
  data: state.representante.data
});

const keyAcess = 'oreon-xp.gridRepresentatesColumns';

const saveColumns = (json) => {
  ColumnPersist.save(keyAcess, json);
};

const getColumns = () => {
  // const configs = ColumnPersist.get(keyAcess);
  // if (configs && configs.size) {
  //   return columns.map((c) => {
  //     const result = c;
  //     const { order, width } = JSON.parse(configs.get(c.key));
  //     result.order = order;
  //     result.width = width;
  //     return result;
  //   });
  // }
  return columns;
};

const deleteColumns = () => {
  ColumnPersist.delete(keyAcess);
};

const GridRepresentante = (props) => {
  return (
    <Grid
      setCurrentRow={props.setCurrentRow}
      minHeight={props.minHeight}
      data={props.data}
      columns={getColumns() ? getColumns() : columns}
      handleRowChange={props.handleRowChange}
      persistColumns={saveColumns}
      enableSummary
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
