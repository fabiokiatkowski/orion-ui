import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { listarEstagio,
  marcarEstagio,
  desmarcarEstagio,
  listarPeriodos,
  marcarPeriodo,
  listarOrdens,
  desmarcarPeriodo,
  marcarUti,
  desmarcarUti,
  desmarcarTodosUti } from '../../redux/modules/tela200';
import GridEstagiosAbertos from './estagiosAbertos/GridEstagiosAbertos';
import GridPeriodos from './periodos/GridPeriodos';
import GridOrdens from './ordens/GridOrdens';
import PainelTotaisOP from './totaisOP/PainelTotaisOP';
import Sizeme from '../../components/Sizeme';
import Botoes from './botoes/Botoes';

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
  marcarUti: bindActionCreators(marcarUti, dispatch),
  desmarcarTodosUti: bindActionCreators(desmarcarTodosUti, dispatch),
  desmarcarUti: bindActionCreators(desmarcarUti, dispatch)
});

class PainelEstagiosAbertos extends Component {
  state = {
    estagiosSelectedRow: [],
    periodosSelectedRow: [],
    estagiosAbertosHeight: 400,
    ordensHeigh: 520,
    resultadoHeight: 300,
    currentRow: null,
    shadowRows: null
  };
  componentDidMount() {
    this.props.listarEstagio();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.ordensData !== this.props.ordensData) {
      this.setState({
        currentRow: null
      });
    }
  }
  // #region estagios row handlers
  onEstagioRowsSelectedHandler = (rows) => {
    this.props.marcarEstagio(rows);
    const currentState = {
      ...this.state
    };
    const newIds = [
      ...currentState.estagiosSelectedRow,
      ...(rows.map(r => r.rowIdx))
    ];
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

  changeEstagiosAbertosSize = (width, height) => {
    this.setState({ estagiosAbertosHeight: height });
  }

  changeGridOrdensSize = (width, height) => {
    this.setState({ ordensHeigh: height });
  }

  changeGridResultadoSize = (width, height) => {
    this.setState({ resultadoHeight: height });
  }

  handleRowChange = (data) => {
    this.setState({ currentRow: data });
  }

  reflectShadowRows = (shadowRows) => {
    this.setState({ shadowRows });
  }

  // #endregion
  // #region
  desmarcarTodosUtiHandler = () => {
    const ops = this.state.shadowRows.map(r => r.get('ordemProducao'));
    this.props.desmarcarTodosUti(ops);
  }
  // #endregion
  render() {
    const {
      estagiosAbertosHeight,
      ordensHeigh,
      resultadoHeight,
      currentRow
    } = this.state;
    const referencia = currentRow && currentRow.get('referenciaPeca');
    const minHeight = estagiosAbertosHeight;
    const { produtoImagens } = this.props;
    const imageList = produtoImagens && produtoImagens.get(referencia);
    const gridEstagios = (
      <Sizeme handleChangeSize={this.changeEstagiosAbertosSize}>
        <button
          className="btn pull-right btn-margin-bottom"
          onClick={this.onListarEstagiosHandler}
        >
          Atualizar Estágios
        </button>
        <GridEstagiosAbertos
          minHeight={minHeight - 100}
          data={this.props.estagiosData}
          onRowsSelected={this.onEstagioRowsSelectedHandler}
          onRowsDeselected={this.onEstagioRowsDeselectedHandler}
          indexes={this.state.estagiosSelectedRow}
        />
        <button
          className="btn pull-right btn-margin-top"
          disabled={this.state.estagiosSelectedRow.length === 0}
          onClick={() => this.props
            .listarPeriodos(this.props.selectedEstagios.join())}
        >
          Consultar Periodos
        </button>
      </Sizeme>
    );
    const gridPeriodo = (
      <div>
        <GridPeriodos
          minHeight={minHeight - 70}
          data={this.props.periodosData}
          onRowsSelected={this.onPeriodoRowsSelectedHandler}
          onRowsDeselected={this.onPeriodoRowsDeselectedHandler}
          indexes={this.state.periodosSelectedRow}
          gridName="tela200periodos"
        />
        <button
          className="btn pull-right btn-margin-top"
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
      <Sizeme handleChangeSize={this.changeGridOrdensSize}>
        <GridOrdens
          minHeight={ordensHeigh - 35}
          data={this.props.ordensData}
          indexes={[]}
          handleRowChange={this.handleRowChange}
          reflectShadowRows={this.reflectShadowRows}
          gridName="tela200ordens"
        />
      </Sizeme>
    );
    return (
      <div className="container200">
        {gridEstagios}
        {gridPeriodo}
        <div className="result200">
          {gridResultado}
          <Botoes
            disabled={!currentRow}
            nivel="1"
            grupo={currentRow && referencia}
            ordemProducao={currentRow && currentRow.get('ordemProducao')}
            ordemPrincipal={currentRow && currentRow.get('ordemPrincipal')}
            onMarcarUTI={() =>
              this.props.marcarUti(
                currentRow.get('ordemProducao'),
                currentRow.get('referenciaPeca'),
              )}
            onDesmarcarUTI={() => this.props.desmarcarUti(currentRow.get('ordemProducao'))}
            onDesmarcarTodosUTI={this.desmarcarTodosUtiHandler}
          />
          {
            currentRow &&
            <Sizeme handleChangeSize={this.changeGridResultadoSize}>
              <PainelTotaisOP
                minHeight={resultadoHeight - 35}
                imageList={imageList}
                referencia={currentRow.get('referenciaPeca')}
                row={currentRow}
              />
            </Sizeme>
          }
        </div>
      </div>
    );
  }
}
PainelEstagiosAbertos.propTypes = {
  produtoImagens: PropTypes.array, //eslint-disable-line
  listarEstagio: PropTypes.func.isRequired,
  listarPeriodos: PropTypes.func.isRequired,
  listarOrdens: PropTypes.func.isRequired,
  marcarEstagio: PropTypes.func.isRequired,
  marcarPeriodo: PropTypes.func.isRequired,
  desmarcarEstagio: PropTypes.func.isRequired,
  desmarcarPeriodo: PropTypes.func.isRequired,
  selectedEstagios: PropTypes.array.isRequired, //eslint-disable-line
  selectedPeriodos: PropTypes.array.isRequired, //eslint-disable-line
  estagiosData: PropTypes.array.isRequired, //eslint-disable-line
  periodosData: PropTypes.array.isRequired, //eslint-disable-line
  ordensData: PropTypes.array.isRequired, //eslint-disable-line
  marcarUti: PropTypes.func.isRequired,
  desmarcarUti: PropTypes.func.isRequired,
  desmarcarTodosUti: PropTypes.func.isRequired
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PainelEstagiosAbertos);

