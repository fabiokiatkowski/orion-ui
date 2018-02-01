import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Types from '../utils/filterTypes';
import Grid from './Grid';
import { list, add } from '../redux/modules/observacao';

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
  state = { observacao: '' }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ordemProducao !== this.props.ordemProducao) {
      this.setState({ observacao: '' });
    }
  }

  onSave = (e) => {
    e.preventDefault();
    const observacao = e.target.observacao.value;
    const data = {
      descEstagio: this.props.descEstagio,
      observacao
    };
    this.props.add(this.props.ordemProducao, data);
  }

  handleRowChange = (data) => {
    const { observacao } = data;
    this.setState({ observacao });
  }

  render() {
    return (
      <div className="observacao-wrapper">
        <form className="form-inline" onSubmit={this.onSave}>
          <div className="form-group observacao">
            <textarea
              className="form-control"
              rows="2"
              id="observacao"
              name="observacao"
            />
          </div>
          <div className="form-group save-button">
            <button type="submit" className="btn btn-primary">Salvar</button>
          </div>
        </form>
        <div className="form-inline">
          <div className="form-group grid-observacao">
            <Grid
              minHeight={161}
              columns={columns}
              data={this.props.observacoes}
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
  }
}

export default Observacao;
