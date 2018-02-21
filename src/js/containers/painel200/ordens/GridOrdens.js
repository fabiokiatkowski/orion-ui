import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import columns from './columns';
import Grid from '../../../components/Grid';
import { desmarcarTodosUti } from '../../../redux/modules/tela200';

const mapDispatchToProps = dispatch => ({
  desmarcarTodosUti: bindActionCreators(desmarcarTodosUti, dispatch)
});

class GridOrdens extends Component {
  static propTypes = {
    handleRowChange: PropTypes.func.isRequired,
    minHeight: PropTypes.number.isRequired,
    indexes: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired
  };

  state = { shadowRows: this.props.data }

  reflectShadowRows = (shadowRows) => {
    this.setState({ shadowRows });
  }
  render() {
    return (
      <div>
        <Grid
          minHeight={this.props.minHeight}
          data={this.props.data}
          columns={columns}
          indexes={this.props.indexes}
          handleRowChange={this.props.handleRowChange}
          enableSummary
          reflectShadowRows={this.reflectShadowRows}
        />
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(GridOrdens);
