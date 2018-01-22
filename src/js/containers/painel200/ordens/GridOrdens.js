import React, { Component } from 'react';
import PropsTypes from 'prop-types';

import columns from './columns';
import Grid from '../../../components/Grid';
import ItensAcao from './itensAcao/ItensAcao';

class GridOrdens extends Component {
  marcarUTIHandler = () => {
    console.log('marcarUTIHandler clicked');
  };
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
          enableSummary
        />
        <ItensAcao
          disabled={this.props.data.length === 0}
          onMarcarUTI={this.marcarUTIHandler}
          onDesmarcarUTI={this.desmarcarUTIHandler}
        />
      </div>
    );
  }
}

GridOrdens.propTypes = {
  minHeight: PropsTypes.number.isRequired,
  indexes: PropsTypes.array.isRequired, //eslint-disable-line
  data: PropsTypes.array.isRequired //eslint-disable-line
};

export default GridOrdens;
