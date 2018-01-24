import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropsTypes from 'prop-types';
import { listarEstagio,
  marcarEstagio,
  desmarcarEstagio,
  listarPeriodos,
  marcarPeriodo,
  listarOrdens,
  desmarcarPeriodo } from '../../redux/modules/tela200';
import { listProductImages } from '../../redux/modules/image';
import GridEstagiosAbertos from './estagiosAbertos/GridEstagiosAbertos';
import GridPeriodos from './periodos/GridPeriodos';
import GridOrdens from './ordens/GridOrdens';
import ImageContainer from '../../components/ImagesContainer';
import fixReferencia from '../../utils/referencia';

const mapStateToProps = state => ({
  estagiosData: state.tela200.estagios.data,
  periodosData: state.tela200.periodos.data,
  ordensData: state.tela200.ordens.data,
  selectedEstagios: state.tela200.estagios.marcados,
  selectedPeriodos: state.tela200.periodos.marcados,
  produtoImagens: state.image.produtos
});

const mapDispatchToProps = dispatch => ({
  listarEstagio: bindActionCreators(listarEstagio, dispatch),
  listarPeriodos: bindActionCreators(listarPeriodos, dispatch),
  listarOrdens: bindActionCreators(listarOrdens, dispatch),
  marcarEstagio: bindActionCreators(marcarEstagio, dispatch),
  desmarcarEstagio: bindActionCreators(desmarcarEstagio, dispatch),
  marcarPeriodo: bindActionCreators(marcarPeriodo, dispatch),
  desmarcarPeriodo: bindActionCreators(desmarcarPeriodo, dispatch),
  listProductImages: bindActionCreators(listProductImages, dispatch)
});

class PainelEstagiosAbertos extends Component {
  state = {
    estagiosSelectedRow: [],
    periodosSelectedRow: [],
    referenciaSelected: null
  };
  componentDidMount() {
    this.props.listarEstagio();
  }
  // #region estagios row handlers
  onEstagioRowsSelectedHandler = (rows) => {
    this.props.marcarEstagio(rows);
    const currentState = {
      ...this.state
    };
    const newIds = currentState.estagiosSelectedRow
      .concat(rows.map(r => r.rowIdx));
    this.setState({
      ...this.state,
      estagiosSelectedRow: newIds,
      periodosSelectedRow: []
    });
  };
  onListarEstagiosHandler = () => {
    this.setState({ estagiosSelectedRow: [] });
    this.props.listarEstagio();
  }
  onEstagioRowsDeselectedHandler = (rows) => {
    this.props.desmarcarEstagio(rows);
    const rowIndexes = rows.map(r => r.rowIdx);
    const newIndexesState = this.state.estagiosSelectedRow.filter(i =>
      rowIndexes.indexOf(i) === -1);
    this.setState({
      ...this.state,
      estagiosSelectedRow: newIndexesState,
      periodosSelectedRow: []
    });
  }
  // #endregion
  // #region periodos row handlers
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
    this.props.desmarcarPeriodo(rows);
    const rowIndexes = rows.map(r => r.rowIdx);
    const newIndexesState = this.state.periodosSelectedRow.filter(i =>
      rowIndexes.indexOf(i) === -1);
    this.setState({
      ...this.state,
      periodosSelectedRow: newIndexesState
    });
  }

  handleRowChange = (data) => {
    const { referenciaPeca } = data;
    this.props.listProductImages(referenciaPeca);
    const referenciaSelected = fixReferencia(referenciaPeca);
    this.setState({ referenciaSelected });
  }

  // #endregion
  render() {
    const minHeight = 300;
    const { produtoImagens } = this.props;
    const { referenciaSelected } = this.state;
    const imageList = produtoImagens && produtoImagens.get(referenciaSelected);
    const gridEstagios = (
      <div>
        <button
          className="btn btn-default pull-right btn-margin-bottom"
          onClick={this.onListarEstagiosHandler}
        >
          Atualizar Estágios
        </button>
        <GridEstagiosAbertos
          minHeight={minHeight}
          data={this.props.estagiosData}
          onRowsSelected={this.onEstagioRowsSelectedHandler}
          onRowsDeselected={this.onEstagioRowsDeselectedHandler}
          indexes={this.state.estagiosSelectedRow}
        />
        <button
          className="btn btn-default pull-right btn-margin-top"
          disabled={this.state.estagiosSelectedRow.length === 0}
          onClick={() => this.props
            .listarPeriodos(this.props.selectedEstagios.join())}
        >
          Consultar Periodos
        </button>
      </div>
    );
    const gridPeriodo = (
      <div>
        <GridPeriodos
          minHeight={minHeight}
          data={this.props.periodosData}
          onRowsSelected={this.onPeriodoRowsSelectedHandler}
          onRowsDeselected={this.onPeriodoRowsDeselectedHandler}
          indexes={this.state.periodosSelectedRow}
        />
        <button
          className="btn btn-default pull-right btn-margin-top"
          disabled={this.state.periodosSelectedRow.length === 0}
          onClick={() => this.props.listarOrdens(
              this.props.selectedEstagios.join(),
              this.props.selectedPeriodos.join()
            )}
        >
          Consultar Ordens
        </button>
      </div>
    );
    const gridResultado = (
      <div>
        <GridOrdens
          minHeight={520}
          data={this.props.ordensData}
          indexes={[]}
          handleRowChange={this.handleRowChange}
        />
      </div>
    );
    return (
      <div className="container200">
        {gridEstagios}
        {gridPeriodo}
        <div className="result200">
          {gridResultado}
          <ImageContainer imageList={imageList} />
        </div>
      </div>
    );
  }
}
PainelEstagiosAbertos.propTypes = {
  produtoImagens: PropsTypes.array, //eslint-disable-line
  listProductImages: PropsTypes.func.isRequired,
  listarEstagio: PropsTypes.func.isRequired,
  listarPeriodos: PropsTypes.func.isRequired,
  listarOrdens: PropsTypes.func.isRequired,
  marcarEstagio: PropsTypes.func.isRequired,
  marcarPeriodo: PropsTypes.func.isRequired,
  desmarcarEstagio: PropsTypes.func.isRequired,
  desmarcarPeriodo: PropsTypes.func.isRequired,
  selectedEstagios: PropsTypes.array.isRequired, //eslint-disable-line
  selectedPeriodos: PropsTypes.array.isRequired, //eslint-disable-line
  estagiosData: PropsTypes.array.isRequired, //eslint-disable-line
  periodosData: PropsTypes.array.isRequired, //eslint-disable-line
  ordensData: PropsTypes.array.isRequired //eslint-disable-line
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PainelEstagiosAbertos);

