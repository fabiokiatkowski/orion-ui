import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import columns from './columns';
import Grid from '../../../components/Grid';
import ItensAcao from './itensAcao/ItensAcao';
import { desmarcarTodosUti } from '../../../redux/modules/tela200';

const mapDispatchToProps = dispatch => ({
  desmarcarTodosUti: bindActionCreators(desmarcarTodosUti, dispatch)
});

class GridOrdens extends Component {
  propTypes = {
    handleRowChange: PropTypes.func.isRequired,
    minHeight: PropTypes.number.isRequired,
    indexes: PropTypes.array.isRequired, //eslint-disable-line
    data: PropTypes.array.isRequired, //eslint-disable-line
    marcarUti: PropTypes.func.isRequired,
    desmarcarTodosUti: PropTypes.func.isRequired,
    desmarcarUti: PropTypes.func.isRequired
  };

  state = { shadowRows: this.props.data }

  reflectShadowRows = (shadowRows) => {
    this.setState({ shadowRows });
  }
  desmarcarTodosUtiHandler = () => {
    const ops = this.state.shadowRows.map((r) => {
      return r.get('ordemProducao');
    });
    this.props.desmarcarTodosUti(ops);
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
        <ItensAcao
          disabled={this.props.data.length === 0}
          onMarcarUTI={this.props.marcarUti}
          onDesmarcarUTI={this.props.desmarcarUti}
          onDesmarcarTodosUTI={this.desmarcarTodosUtiHandler}
        />
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(GridOrdens);
