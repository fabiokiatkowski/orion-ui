import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Nav,
  NavItem,
  Tab } from 'react-bootstrap';
import Localizador from './Localizador';
import copyToClipboard from '../../utils/clipboard';
import { getDescPeca, getDescProduto } from '../../redux/modules/visualizador';

const mapStateToProps = state => ({
  descricaoProduto: state.visualizador.descricaoProduto
});

const mapDispathToProps = dispatch => ({
  getDescPeca: bindActionCreators(getDescPeca, dispatch),
  getDescProduto: bindActionCreators(getDescProduto, dispatch),
});

class PainelVisualizador extends Component {
  static propTypes = {
    descricaoProduto: PropTypes.string.isRequired,
    getDescPeca: PropTypes.func.isRequired,
    getDescProduto: PropTypes.func.isRequired
  }

  state = {
    nivel: '',
    grupo: '',
    subGrupo: '',
    item: ''
  }

  handleConsultar = () => {
    const {
      nivel,
      grupo,
      subGrupo,
      item
    } = this.state;

    if (nivel === '1') {
      this.props.getDescPeca(grupo);
    } else {
      this.props.getDescProduto(nivel, grupo, subGrupo, item)
    }
  }

  handleSelect = (nivel, grupo, subGrupo, item) => {
    this.setState({
      nivel, grupo, subGrupo, item
    }, () => this.handleConsultar());
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  copy = () => {
    const {
      nivel, grupo, subGrupo, item
    } = this.state;
    const text = nivel + grupo + subGrupo + item;
    copyToClipboard(text);
  }

  clean = () => {
    this.setState({
      nivel: '',
      grupo: '',
      subGrupo: '',
      item: ''
    });
  }

  render() {
    const {
      nivel, grupo, subGrupo, item
    } = this.state;
    return (
      <div>
        <Tab.Container activeKey={this.state.tabKey} onSelect={this.handleTabSelect} id="painel-visualizador">
          <Row className="clearfix">
            <Col sm={12}>
              <Nav bsStyle="tabs">
                <NavItem eventKey="1">Referencia</NavItem>
                <NavItem eventKey="2">Teste 1</NavItem>
                <NavItem eventKey="3">Teste 2</NavItem>
              </Nav>
            </Col>
            <Col sm={12}>
              <Tab.Content animation>
                <Tab.Pane eventKey="1">
                  <div className="referencia-container">
                    <div className="form-container">
                      <div className="produto-input">
                        <Localizador onSelect={this.handleSelect} />
                        <input type="text" value={nivel} onChange={this.handleChange} maxLength="1" className="form-control" id="nivel" name="nivel" placeholder="Nivel" />
                        <input type="text" value={grupo} onChange={this.handleChange} maxLength="5" className="form-control" id="grupo" name="grupo" placeholder="Grupo" />
                        <input type="text" value={subGrupo} onChange={this.handleChange} maxLength="3" className="form-control" id="subGrupo" name="subGrupo" placeholder="Sub" />
                        <input type="text" value={item} onChange={this.handleChange} maxLength="6" className="form-control" id="item" name="item" placeholder="Item" />
                        <button onClick={this.handleConsultar} className="btn btn-primary">Consultar</button>
                        <button onClick={this.copy} className="btn btn-primary">Copiar</button>
                        <button onClick={this.clean} className="btn btn-primary">Limpar</button>
                      </div>
                      <div className="form-group descricao">
                        <textarea
                          value={this.props.descricaoProduto}
                          className="form-control"
                          rows="8"
                          id="descricao"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="2">
                  <h1> ... </h1>
                </Tab.Pane>
                <Tab.Pane eventKey="3">
                  <h2> ... </h2>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispathToProps)(PainelVisualizador);
