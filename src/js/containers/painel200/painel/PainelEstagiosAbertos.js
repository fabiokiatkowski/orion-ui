import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropsTypes from 'prop-types';
import { listaEstagio, marcarEstagio, desmarcarEstagio } from '../../../redux/modules/painel200/estagiosAbertos';
import { listarPeriodos, marcarPeriodo } from '../../../redux/modules/painel200/periodos';

import GridEstagiosAbertos from '../filtros/estagiosAbertos/GridEstagiosAbertos';
import GridPeriodos from '../filtros/periodos/GridPeriodos';

const mapStateToProps = state => ({
  data: state.estagiosAbertos.data,
  periodosData: state.periodos200.data,
  selectedEstagios: state.estagiosAbertos.estagiosMarcados,
  selectedPeriodos: state.periodos200.periodos
});

const mapDispatchToProps = dispatch => ({
  list: bindActionCreators(listaEstagio, dispatch),
  listarPeriodos: bindActionCreators(listarPeriodos, dispatch),
  marcarEstagio: bindActionCreators(marcarEstagio, dispatch),
  desmarcarEstagio: bindActionCreators(desmarcarEstagio, dispatch),
  marcarPeriodo: bindActionCreators(marcarPeriodo, dispatch),
});


class PainelEstagiosAbertos extends Component {
  state = {
    estagiosSelectedRow: [],
    periodosSelectedRow: []
  };
  componentDidMount() {
    this.props.list();
  }
  //#region estagios row handlers
  onEstagioRowsSelectedHandler = (rows) => {
    this.props.marcarEstagio(rows);
    const currentState = {
      ...this.state
    };
    const newIds = currentState.estagiosSelectedRow
      .concat(rows.map(r => r.rowIdx));
    this.setState({ estagiosSelectedRow: newIds });
  };
  onEstagioRowsDeselectedHandler = (rows) => {
    this.props.desmarcarEstagio(rows);
    const rowIndexes = rows.map(r => r.rowIdx);
    const newIndexesState = this.state.estagiosSelectedRow.filter(i =>
      rowIndexes.indexOf(i) === -1);
    this.setState({
      ...this.state,
      estagiosSelectedRow: newIndexesState
    });
  }
  //#endregion 
  //#region periodos row handlers
  onPeriodoRowsSelectedHandler = (rows) => {
    this.props.marcarPeriodo(rows);
    const currentState = {
      ...this.state
    };
    const newIds = currentState.periodosSelectedRow
      .concat(rows.map(r => r.rowIdx));
    this.setState({ periodosSelectedRow: newIds });
  };
  onPeriodoRowsDeselectedHandler = (rows) => {
    const rowIndexes = rows.map(r => r.rowIdx);
    const newIndexesState = this.state.periodosSelectedRow.filter(i =>
      rowIndexes.indexOf(i) === -1);
    this.setState({
      ...this.state,
      periodosSelectedRow: newIndexesState
    });
  }
  //#endregion
  render() {
    const minHeight = 300;
    return (
      <div className="container200">
        <div>
          <GridEstagiosAbertos
            minHeight={minHeight}
            data={this.props.data}
            onRowsSelected={this.onEstagioRowsSelectedHandler}
            onRowsDeselected={this.onEstagioRowsDeselectedHandler}
            indexes={this.state.estagiosSelectedRow}
          />
          <button
            onClick={() => this.props
              .listarPeriodos(this.props.selectedEstagios.join())}
          >Consultar Periodos
          </button>
        </div>
        <div>
          <GridPeriodos
            minHeight={minHeight}
            data={this.props.periodosData}
            onRowsSelected={this.onPeriodoRowsSelectedHandler}
            onRowsDeselected={this.onPeriodoRowsDeselectedHandler}
            indexes={this.state.periodosSelectedRow}
          />
        </div>
        <div className="result200">three</div>
      </div>
    );
  }
}

PainelEstagiosAbertos.propTypes = {
  list: PropsTypes.func.isRequired,
  listarPeriodos: PropsTypes.func.isRequired,
  marcarEstagio: PropsTypes.func.isRequired,
  marcarPeriodo: PropsTypes.func.isRequired,
  desmarcarEstagio: PropsTypes.func.isRequired,
  selectedEstagios: PropsTypes.array.isRequired, //eslint-disable-line
  data: PropsTypes.array.isRequired, //eslint-disable-line
  periodosData: PropsTypes.array.isRequired //eslint-disable-line
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PainelEstagiosAbertos);

