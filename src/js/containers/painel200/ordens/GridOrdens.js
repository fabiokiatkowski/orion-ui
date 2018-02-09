import React, { Component } from 'react';
import PropTypes from 'prop-types';
import columns from './columns';
import Grid from '../../../components/Grid';
import ItensAcao from './itensAcao/ItensAcao';

class GridOrdens extends Component {
  desmarcarUTIHandler = () => {
    console.log('desmarcarUTIHandler clicked');
  };
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
        />
        <ItensAcao
          disabled={this.props.data.length === 0}
          onMarcarUTI={this.props.marcarUti}
          onDesmarcarUTI={this.desmarcarUTIHandler}
        />
      </div>
    );
  }
}

GridOrdens.propTypes = {
  handleRowChange: PropTypes.func.isRequired,
  minHeight: PropTypes.number.isRequired,
  indexes: PropTypes.array.isRequired, //eslint-disable-line
  data: PropTypes.array.isRequired, //eslint-disable-line
  marcarUti: PropTypes.func.isRequired
};

export default GridOrdens;
