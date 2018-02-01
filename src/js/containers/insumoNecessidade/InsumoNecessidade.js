import React, { Component } from 'react';
import PropTypes from 'prop-types';
import columns from './columns';
import Grid from '../../components/Grid';

class InsumoNecessidade extends Component {
  state = {
    insumoHeight: 300
  }

  changeSize = (width, height) => {
    this.setState({ insumoHeight: height });
  }

  render() {
    const { insumoHeight } = this.state;
    return (
      <div>
        <Grid
          minHeight={insumoHeight}
          columns={columns}
          data={[]}
          indexes={[]}
          handleRowChange={this.handleRowChange}
        />
        <div className="form-check form-check-inline">
          <input type="checkbox" className="form-check-input" id="checkToReceive" />
          <label className="form-check-label" htmlFor="checkToReceive">Check me out</label>
        </div>
      </div>
    );
  }
}

InsumoNecessidade.propTypes = {
  data: PropTypes.array.isRequired, //eslint-disable-line
};

export default (InsumoNecessidade);
