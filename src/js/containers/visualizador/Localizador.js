import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  ButtonToolbar,
  Button,
  Modal
} from 'react-bootstrap';
import { Map } from 'immutable';
import Grid from '../../components/Grid';
import columns from './columns';
import { listProdutosLocalizador } from '../../redux/modules/visualizador';

const mapStateToProps = state => ({
  produtos: state.visualizador.produtosLocalizador
});

const mapDispathToProps = dispatch => ({
  list: bindActionCreators(listProdutosLocalizador, dispatch)
});

class Localizador extends Component {
  static propTypes = {
    produtos: PropTypes.array,
    list: PropTypes.func,
    onSelect: PropTypes.func.isRequired
  };

  static defaultProps = {
    produtos: [],
    list: () => {}
  }

  state = { showBuscador: false, rowSelect: new Map() }

  handleOpenModal = () => {
    this.setState({ showBuscador: true });
  }

  handleCloseModal = () => {
    this.setState({ showBuscador: false });
  }

  search = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const nivel = e.target.nivel.value;
    const grupo = e.target.grupo.value;
    const subGrupo = e.target.subGrupo.value;
    const item = e.target.item.value;
    const descricao = e.target.descricao.value;
    const complemento = e.target.complemento.value;
    const payload = {
      nivel, grupo, subGrupo, item, descricao, complemento
    };
    let hasFilter = false;
    Object.values(payload).forEach((x) => {
      if (x) hasFilter = true;
    });
    if (hasFilter) {
      this.props.list(payload);
    } else {
      alert('Nenhum filtro utilizado');
    }
  }

  changeMan = (data) => {
    this.setState({ rowSelect: data });
  }

  handleRowChange = (data) => {
    this.changeMan(data);
  };

  handleSelecionar = () => {
    const { rowSelect } = this.state;
    const nivel = rowSelect.get('nivel_estrutura');
    const grupo = rowSelect.get('grupo_estrutura');
    const subGrupo = rowSelect.get('subgru_estrutura');
    const item = rowSelect.get('item_estrutura');
    this.props.onSelect(nivel, grupo, subGrupo, item);
    this.setState({ showBuscador: false });
  }

  render() {
    return (
      <div className="fullscreen-modal-container">
        <ButtonToolbar>
          <Button bsStyle="btn" onClick={this.handleOpenModal}>
            Buscar
          </Button>
          <Modal
            show={this.state.showBuscador}
            onHide={this.handleCloseModal}
            dialogClassName="fullscreen-modal-container"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-lg">
                Buscador
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={this.search} autoComplete="off">
                <div className="produto-input">
                  <input maxLength="1" type="text" className="form-control" id="nivel" name="nivel" placeholder="Nivel" />
                  <input maxLength="5" type="text" className="form-control" id="grupo" name="grupo" placeholder="Grupo" />
                  <input maxLength="3" type="text" className="form-control" id="subGrupo" name="subGrupo" placeholder="Sub" />
                  <input maxLength="6" type="text" className="form-control" id="item" name="item" placeholder="Item" />
                </div>
                <div className="descricao-input">
                  <input minLength="5" type="text" className="form-control" id="descricao" name="descricao" placeholder="Descrição" />
                  <input minLength="5" type="text" className="form-control" id="complemento" name="complemento" placeholder="Complemento" />
                </div>
                <div className="form-group save-button">
                  <button type="submit" className="btn">Buscar</button>
                </div>
              </form>
              <div className="wrapperWrapperWrapper">
                <Grid
                  minHeight={500}
                  columns={columns}
                  data={this.props.produtos}
                  handleRowChange={this.handleRowChange}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button bsStyle="btn" onClick={this.handleSelecionar}>Selecionar</Button>
              <Button bsStyle="btn" onClick={this.handleCloseModal}>Fechar</Button>
            </Modal.Footer>
          </Modal>
        </ButtonToolbar>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispathToProps)(Localizador);
