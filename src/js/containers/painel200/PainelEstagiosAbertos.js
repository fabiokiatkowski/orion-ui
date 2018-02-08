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
  desmarcarPeriodo } from '../../redux/modules/tela200';
import { listProductImages } from '../../redux/modules/image';
import GridEstagiosAbertos from './estagiosAbertos/GridEstagiosAbertos';
import GridPeriodos from './periodos/GridPeriodos';
import GridOrdens from './ordens/GridOrdens';
import PainelTotaisOP from './totaisOP/PainelTotaisOP';
import fixReferencia from '../../utils/referencia';
import Sizeme from '../../components/Sizeme';

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
    referenciaSelected: null,
    opSelected: null,
    estagiosAbertosHeight: 400,
    ordensHeigh: 520,
    itemSelected: null
  };
  componentDidMount() {
    this.props.listarEstagio();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ordensData !== this.props.ordensData) {
      this.setState({
        referenciaSelected: null
      });
    }
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

  changeEstagiosAbertosSize = (width, height) => {
    this.setState({ estagiosAbertosHeight: height });
  }

  changeGridOrdensSize = (width, height) => {
    this.setState({ ordensHeigh: height });
  }

  handleRowChange = (data) => {
    const referenciaPeca = data.get('referenciaPeca');
    const ordemProducao = data.get('ordemProducao');
    const descodEstagio = data.get('descodEstagio');
    const itemSelected = data.get('proconfItem');
    this.props.listProductImages(referenciaPeca);
    const referenciaSelected = fixReferencia(referenciaPeca);
    this.setState({
      referenciaSelected,
      itemSelected,
      opSelected: ordemProducao,
      descEstagioSelected: descodEstagio
    });
  }

  // #endregion
  render() {
    const {
      referenciaSelected,
      opSelected,
      estagiosAbertosHeight,
      ordensHeigh,
      descEstagioSelected
    } = this.state;
    const minHeight = estagiosAbertosHeight;
    const { produtoImagens } = this.props;
    const imageList = produtoImagens && produtoImagens.get(referenciaSelected);
    const gridEstagios = (
      <Sizeme handleChangeSize={this.changeEstagiosAbertosSize}>
        <button
          className="btn btn-default pull-right btn-margin-bottom"
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
          className="btn btn-default pull-right btn-margin-top"
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
      <Sizeme handleChangeSize={this.changeGridOrdensSize}>
        <GridOrdens
          minHeight={ordensHeigh - 35}
          data={this.props.ordensData}
          indexes={[]}
          handleRowChange={this.handleRowChange}
        />
      </Sizeme>
    );
    return (
      <div className="container200">
        {gridEstagios}
        {gridPeriodo}
        <div className="result200">
          {gridResultado}
          {this.state.referenciaSelected &&
            <PainelTotaisOP
              imageList={imageList}
              referencia={referenciaSelected}
              op={opSelected}
              descEstagio={descEstagioSelected}
              item={this.state.itemSelected}
            />
          }
        </div>
      </div>
    );
  }
}
PainelEstagiosAbertos.propTypes = {
  produtoImagens: PropTypes.array, //eslint-disable-line
  listProductImages: PropTypes.func.isRequired,
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
  ordensData: PropTypes.array.isRequired //eslint-disable-line
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PainelEstagiosAbertos);

