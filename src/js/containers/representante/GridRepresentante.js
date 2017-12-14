import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropsTypes from 'prop-types';
import Grid from '../../components/Grid';
import columns from './columns';

const mapStateToProps = state => ({
  data: state.representante.data
});

class GridRepresentante extends Component {
  static propTypes = {
    minHeight: PropsTypes.number.isRequired,
    data: PropsTypes.array.isRequired //eslint-disable-line
  }

  render() {
    return (
      <Grid
        setCurrentRow={this.props.setCurrentRow}
        minHeight={this.props.minHeight}
        data={this.props.data}
        columns={columns}
        handleRowChange={this.props.handleRowChange}
      />
    );
  }
}

export default connect(mapStateToProps, null)(GridRepresentante);
