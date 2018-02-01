import React, { Component } from 'react';
import PropTypes from 'prop-types';
import columns from './columns';
import Grid from '../../components/Grid';
import Sizeme from '../../components/Sizeme';

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
      <div className="insumo-estoque">
        <Sizeme handleChangeSize={this.changeSize}>
          <Grid
            minHeight={300}
            columns={columns}
            data={[]}
            indexes={[]}
            handleRowChange={this.handleRowChange}
          />
        </Sizeme>
      </div>
    );
  }
}

InsumoNecessidade.propTypes = {
  data: PropTypes.array.isRequired, //eslint-disable-line
};

export default (InsumoNecessidade);
