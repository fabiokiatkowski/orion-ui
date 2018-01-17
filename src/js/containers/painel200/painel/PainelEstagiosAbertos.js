import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropsTypes from 'prop-types';
import { listaEstagio, marcarEstagio, desmarcarEstagio } from '../../../redux/modules/painel200/filtros/estagiosAbertos';

import GridEstagiosAbertos from '../filtros/estagiosAbertos/GridEstagiosAbertos';

const mapStateToProps = state => ({
  data: state.filtrosEstagiosAbertos.data,
  selectedEstagios: state.filtrosEstagiosAbertos.estagiosMarcados
});

const mapDispatchToProps = dispatch => ({
  list: bindActionCreators(listaEstagio, dispatch),
  marcarEstagio: bindActionCreators(marcarEstagio, dispatch),
  desmarcarEstagio: bindActionCreators(desmarcarEstagio, dispatch),
});


class PainelEstagiosAbertos extends Component {
  state = {
    selectedRow: []
  };
  componentDidMount() {
    this.props.list();
  }
  onRowsSelectedHandler = (rows) => {
    this.props.marcarEstagio(rows);
    const currentState = {
      ...this.state
    };
    const newIds = currentState.selectedRow.concat(rows.map(r => r.rowIdx));
    this.setState({ selectedRow: newIds });
  };
  onRowsDeselectedHandler = (rows) => {
    this.props.desmarcarEstagio(rows);
    const rowIndexes = rows.map(r => r.rowIdx);
    const newIndexesState = this.state.selectedRow.filter(i =>
      rowIndexes.indexOf(i) === -1);
    this.setState({
      ...this.state,
      selectedRow: newIndexesState
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
        </div>
        <div>Two</div>
        <div className="result200">three</div>
      </div>
    );
  }
}

PainelEstagiosAbertos.propTypes = {
  list: PropsTypes.func.isRequired,
  marcarEstagio: PropsTypes.func.isRequired,
  desmarcarEstagio: PropsTypes.func.isRequired,
  selectedEstagios: PropsTypes.array.isRequired, //eslint-disable-line
  data: PropsTypes.array.isRequired //eslint-disable-line
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PainelEstagiosAbertos);

