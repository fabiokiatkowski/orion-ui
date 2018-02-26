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
import { clean, getDescPeca, getDescProduto, getOndeUsa } from '../../redux/modules/visualizador';
import OndeUsaGrid from './ondeUsa/OndeUsaGrid';
import ImageContainer from '../../components/ImagesContainer';

const mapStateToProps = state => ({
  descricaoProduto: state.visualizador.descricaoProduto,
});

const mapDispathToProps = dispatch => ({
  getDescPeca: bindActionCreators(getDescPeca, dispatch),
  getDescProduto: bindActionCreators(getDescProduto, dispatch),
  clean: bindActionCreators(clean, dispatch),
  getOndeUsa: bindActionCreators(getOndeUsa, dispatch),
});

class PainelVisualizador extends Component {
  static propTypes = {
    descricaoProduto: PropTypes.string.isRequired,
    getDescPeca: PropTypes.func.isRequired,
    getDescProduto: PropTypes.func.isRequired,
    clean: PropTypes.func.isRequired,
  }

  state = {
    nivel: '',
    grupo: '',
    subGrupo: '',
    item: '',
    localizadorTabKey: 1,
    gridTabKey: 1
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
      this.props.getDescProduto(nivel, grupo, subGrupo, item);
    }

    if (this.ondeUsa) this.ondeUsa.wrappedInstance.list();
  }

  handleSelect = (nivel, grupo, subGrupo, item) => {
    this.setState({
      nivel, grupo, subGrupo, item
    }, () => {
      this.handleConsultar();
    });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleLocalizadorTab = (localizadorTabKey) => {
    this.setState({ localizadorTabKey });
  }

  handleGridTab = (gridTabKey) => {
    this.setState({ gridTabKey });
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
      item: '',
      localizadorTabKey: 1,
      gridTabKey: 1
    }, () => this.props.clean());
  }

  render() {
    const {
      nivel,
      grupo,
      subGrupo,
      item,
      localizadorTabKey,
      gridTabKey
    } = this.state;
    return (
      <div className="visualizador-grid-container">
        <div className="localizador-grid-track">
          <Tab.Container activeKey={localizadorTabKey} onSelect={this.handleLocalizadorTab} id="painel-visualizador">
            <Row className="clearfix">
              <Col sm={12}>
                <Nav bsStyle="tabs">
                  <NavItem eventKey={1}>Referencia</NavItem>
                  <NavItem eventKey={2}>Teste 1</NavItem>
                  <NavItem eventKey={3}>Teste 2</NavItem>
                </Nav>
              </Col>
              <Col sm={12}>
                <Tab.Content animation>
                  <Tab.Pane eventKey={1}>
                    {localizadorTabKey === 1 &&
                      <div className="referencia-container">
                        <div className="form-container">
                          <div className="produto-input">
                            <Localizador onSelect={this.handleSelect} />
                            <input autoComplete="off" type="text" value={nivel} onChange={this.handleChange} maxLength="1" className="form-control" id="nivel" name="nivel" placeholder="Nivel" />
                            <input autoComplete="off" type="text" value={grupo} onChange={this.handleChange} maxLength="5" className="form-control" id="grupo" name="grupo" placeholder="Grupo" />
                            <input autoComplete="off" type="text" value={subGrupo} onChange={this.handleChange} maxLength="3" className="form-control" id="subGrupo" name="subGrupo" placeholder="Sub" />
                            <input autoComplete="off" type="text" value={item} onChange={this.handleChange} maxLength="6" className="form-control" id="item" name="item" placeholder="Item" />
                            <button onClick={this.handleConsultar} className="btn">Consultar</button>
                            <button onClick={this.copy} className="btn">Copiar</button>
                            <button onClick={this.clean} className="btn">Limpar</button>
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
                    }
                  </Tab.Pane>
                  <Tab.Pane eventKey={2}>
                    <h1> ... </h1>
                  </Tab.Pane>
                  <Tab.Pane eventKey={3}>
                    <h2> ... </h2>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
        <div className="image-grid-track">
          <ImageContainer
            nivel={nivel}
            grupo={grupo}
            subGrupo={subGrupo}
            item={item}
            showHeader
            height={750}
          />
        </div>
        <div className="visualizador-grid-track">
          <Tab.Container activeKey={gridTabKey} onSelect={this.handleGridTab} id="visualizador-grids">
            <Row className="clearfix">
              <Col sm={12}>
                <Nav bsStyle="tabs">
                  <NavItem eventKey={1}>Teste 1</NavItem>
                  <NavItem eventKey={2}>Onde Usa</NavItem>
                  <NavItem eventKey={3}>Teste 2</NavItem>
                </Nav>
              </Col>
              <Col sm={12}>
                <Tab.Content animation>
                  <Tab.Pane eventKey={1}>
                    <h1> ... </h1>
                  </Tab.Pane>
                  <Tab.Pane eventKey={2}>
                    {gridTabKey === 2 &&
                      <OndeUsaGrid
                        ref={(instance) => { this.ondeUsa = instance; }}
                        nivel={nivel}
                        grupo={grupo}
                        subGrupo={subGrupo}
                        item={item}
                      />
                    }
                  </Tab.Pane>
                  <Tab.Pane eventKey={3}>
                    <h2> ... </h2>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispathToProps)(PainelVisualizador);
