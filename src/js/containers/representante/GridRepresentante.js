import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Grid from '../../components/Grid';
import { list } from '../../redux/modules/representante';
import columns from './columns';

const mapStateToProps = state => ({
  data: state.representante.data
});

const mapDispatchToProps = dispatch => ({
  list: bindActionCreators(list, dispatch)
});

class GridRepresentante extends Component {
  componentDidMount() {
    this.props.list();
  }

  render() {
    return (
      <Grid
        height={this.props.height}
        width={this.props.width}
        data={this.props.data}
        columns={columns}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GridRepresentante);
