import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Types from '../utils/filterTypes';
import Grid from './Grid';
import fixReferencia from '../utils/referencia';
import ObservacaoTypes from '../types/ObservacaoTypes';
import { add, list, listPeD, getStObs } from '../redux/modules/observacao';

const columns = [
  {
    key: 'dataObservacao',
    name: 'Data',
    filterable: true,
    resizable: true,
    sortable: false,
    type: Types.DATE,
    order: 1,
  },
  {
    key: 'usuario',
    name: 'Usuario',
    filterable: true,
    resizable: true,
    sortable: false,
    type: Types.TEXT,
    order: 2,
  },
  {
    key: 'estagio',
    name: 'Estagio',
    filterable: true,
    resizable: true,
    sortable: false,
    type: Types.TEXT,
    order: 3,
  },
  {
    key: 'observacao',
    name: 'obs aux',
    hidden: true
  }
];

class Observacao extends Component {
  state = {
    observacao: '',
    observacaoText: '',
    columnsDef: columns
  }

  componentDidMount() {
    this.props.list(this.props.ordemProducao, false);
    this.props.getObservacaoSystextil(this.props.ordemProducao);
    if (this.props.referencia) {
      this.props.listPeD(fixReferencia(this.props.referencia));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ordemProducao !== this.props.ordemProducao) {
      this.props.list(nextProps.ordemProducao, false);
      this.props.getObservacaoSystextil(nextProps.ordemProducao);
    }
    if (this.props.referencia &&
      nextProps.referencia !== this.props.referencia) {
      this.props.listPeD(fixReferencia(nextProps.referencia));
    }
    this.setState({
      observacao: '',
      observacaoText: ''
    });
    if (!this.props.descEstagio) {
      const virtualState = this.state.columnsDef.map((col) => {
        const virtualCol = col;
        if (col.key === 'estagio') {
          virtualCol.hidden = true;
        }
        return virtualCol;
      });
      this.setState({ ...virtualState });
    }
  }

  onSave = (e) => {
    e.preventDefault();
    const observacao = this.state.observacaoText;
    const data = {
      descEstagio: this.props.descEstagio,
      observacao
    };
    this.props.add(this.props.ordemProducao, data);
    this.setState({ observacaoText: '' });
  }
  handleObservacaoChange = (event) => {
    this.setState({ observacaoText: event.target.value });
  }
  handleRowChange = (data) => {
    const observacao = data.get('observacao');
    this.setState({ observacao });
  }

  renderFormAdd = () => {
    return (
      <form className="form-inline" onSubmit={this.onSave}>
        <div className="form-group observacao">
          <textarea
            className="form-control"
            rows="2"
            id="observacao"
            name="observacao"
            value={this.state.observacaoText}
            onChange={this.handleObservacaoChange}
          />
        </div>
        <div className="form-group save-button">
          <button type="submit" className="btn btn-save-obs">Salvar</button>
        </div>
      </form>
    );
  }

  render() {
    let observacaoRender = (
      <div>
        {this.props.canAdd && this.renderFormAdd()}
        <div className="form-inline">
          <div className="form-group grid-observacao">
            <Grid
              minHeight={161}
              columns={this.state.columnsDef}
              data={this.props.tipoObservacao === ObservacaoTypes.PeD ?
                this.props.observacaoPeDData :
                this.props.observacaoData
              }
              handleRowChange={this.handleRowChange}
            />
          </div>
          <div className="form-group observacao-2">
            <textarea
              value={this.state.observacao}
              className="form-control"
              rows="8"
              id="observacao-2"
            />
          </div>
        </div>
      </div>
    );
    if (this.props.tipoObservacao === ObservacaoTypes.SYSTEXTIL) {
      observacaoRender = (
        <textarea
          className="form-control"
          rows="2"
          id="observacao-st"
          name="observacao-st"
          value={this.props.observacaoOrdemData}
        />
      );
    }

    return (
      <div className="observacao-wrapper">
        {observacaoRender}
      </div>
    );
  }
}

Observacao.propTypes = {
  ordemProducao: PropTypes.number.isRequired,
  descEstagio: PropTypes.string,
  tipoObservacao: PropTypes.objectOf(ObservacaoTypes),
  referencia: PropTypes.string,
  observacaoData: PropTypes.array.isRequired,
  observacaoPeDData: PropTypes.array.isRequired,
  observacaoOrdemData: PropTypes.string,
  canAdd: PropTypes.bool,
  add: PropTypes.func.isRequired,
  list: PropTypes.func.isRequired,
  listPeD: PropTypes.func.isRequired,
  getObservacaoSystextil: PropTypes.func.isRequired,
};

Observacao.defaultProps = {
  canAdd: false,
  descEstagio: '',
  tipoObservacao: ObservacaoTypes.ORION,
  observacaoOrdemData: '',
  referencia: null,
};
const mapStateToProps = state => ({
  observacaoData: state.observacao.obs,
  observacaoOrdemData: state.observacao.systextil,
  observacaoPeDData: state.observacao.ped
});
const mapDispatchToProps = dispatch => ({
  add: bindActionCreators(add, dispatch),
  list: bindActionCreators(list, dispatch),
  listPeD: bindActionCreators(listPeD, dispatch),
  getObservacaoSystextil: bindActionCreators(getStObs, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Observacao);
