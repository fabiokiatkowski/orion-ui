import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropsTypes from 'prop-types';
import Grid from '../../components/Grid';
import { list, setCurrentRow } from '../../redux/modules/representante';
import columns from './columns';

const mapStateToProps = state => ({
  data: state.representante.data,
  currentRow: state.representante.currentRow
});

const mapDispatchToProps = dispatch => ({
  list: bindActionCreators(list, dispatch),
  // setCurrentRow: bindActionCreators(setCurrentRow, dispatch)
});

class GridRepresentante extends Component {
  static propTypes = {
    list: PropsTypes.func.isRequired,
    setCurrentRow: PropsTypes.func.isRequired,
    minHeight: PropsTypes.number.isRequired,
    data: PropsTypes.object.isRequired //eslint-disable-line
  }

  componentDidMount() {
    this.props.list('foo');
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

export default connect(mapStateToProps, mapDispatchToProps)(GridRepresentante);
