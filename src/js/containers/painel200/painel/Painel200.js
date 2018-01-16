import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropsTypes from 'prop-types';
import { listaEstagio } from '../../../redux/modules/painel200/filtros/estagiosAbertos';

import GridEstagiosAbertos from '../filtros/estagiosAbertos/GridEstagiosAbertos';

const mapStateToProps = state => ({
  data: state.filtrosEstagiosAbertos.data
});

const mapDispatchToProps = dispatch => ({
  list: bindActionCreators(listaEstagio, dispatch),
});


class Painel200 extends Component {
  state = {
    selectedRow: [],
    selectedEstagios: []
  };
  componentDidMount() {
    this.props.list();
  }
  onRowsSelectedHandler = (rows) => {
    const currentState = {
      ...this.state
    };
    const newIds = currentState.selectedRow.concat(rows.map(r => r.rowIdx));
    const newEstagios = currentState.selectedEstagios.concat(rows.map(r =>
      r.row.codigoEstagio));
    this.setState({ selectedRow: newIds, selectedEstagios: newEstagios });
  };
  onRowsDeselectedHandler = (rows) => {
    const rowIndexes = rows.map(r => r.rowIdx);
    const rowEstagio = rows.map(r => r.row.codigoEstagio);
    const currentState = {
      ...this.state
    };
    const newIndexesState = currentState.selectedRow.filter(i =>
      rowIndexes.indexOf(i) === -1);
    const newEstagioState = currentState.selectedEstagios.filter(i =>
      rowEstagio.indexOf(i) === -1);
    this.setState({
      selectedRow: newIndexesState,
      selectedEstagios: newEstagioState
    });
  }
  render() {
    const minHeight = 300;
    return (
      <div className="container200">
        <div>
          <GridEstagiosAbertos
            minHeight={minHeight}
            data={this.props.data}
            onRowsSelected={this.onRowsSelectedHandler}
            onRowsDeselected={this.onRowsDeselectedHandler}
            indexes={this.state.selectedRow}
          />
          <p>Estágios selecionados:
            <strong>{this.state.selectedEstagios.join()}</strong>
          </p>
        </div>
        <div>Two</div>
        <div className="result200">three</div>
      </div>
    );
  }
}

Painel200.propTypes = {
  list: PropsTypes.func.isRequired,
  data: PropsTypes.array.isRequired //eslint-disable-line
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Painel200);

