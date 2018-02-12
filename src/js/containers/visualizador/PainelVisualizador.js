import React, { Component } from 'react';
import {
  ButtonToolbar,
  Button,
  Modal,
  Row,
  Col,
  Nav,
  NavItem,
  Tab } from 'react-bootstrap';
import Grid from '../../components/Grid';

const columns = [
  {
    key: 'teste1',
    name: 'Teste 1',
    resizable: true,
    hidden: false,
    sortable: true,
    order: 0,
  },
  {
    key: 'teste2',
    name: 'Teste 2',
    resizable: true,
    hidden: false,
    sortable: true,
    order: 1,
  },
  {
    key: 'teste3',
    name: 'Teste 3',
    resizable: true,
    hidden: false,
    sortable: true,
    order: 2,
  }
];

class PainelVisualizador extends Component {
  state = { showBuscador: false }

  handleOpenModal = () => {
    this.setState({ showBuscador: true });
  }

  handleCloseModal = () => {
    this.setState({ showBuscador: false });
  }

  renderBuscador = () => {
    return (
      <div className="fullscreen-modal-container">
        <ButtonToolbar>
          <Button bsStyle="primary" onClick={this.handleOpenModal}>
            Buscar
          </Button>
          <Modal
            {...this.props}
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
              <form>
                <div className="produto-input">
                  <input maxLength="1" type="text" className="form-control" id="nivel" name="nivel" placeholder="Nivel" />
                  <input maxLength="5" type="text" className="form-control" id="grupo" name="grupo" placeholder="Grupo" />
                  <input maxLength="3" type="text" className="form-control" id="subGrupo" name="subGrupo" placeholder="Sub" />
                  <input maxLength="6" type="text" className="form-control" id="item" name="item" placeholder="Item" />
                </div>
                <div className="descricao-input">
                  <input type="text" className="form-control" id="descricao" name="descricao" placeholder="Descrição" />
                  <input type="text" className="form-control" id="complemento" name="complemento" placeholder="Complemento" />
                </div>
                <div className="form-group save-button">
                  <button className="btn btn-primary">Buscar</button>
                </div>
              </form>
              <div className="wrapperWrapperWrapper">
                <Grid
                  minHeight={500}
                  columns={columns}
                  data={[]}
                  handleRowChange={() => {}}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleCloseModal}>Close</Button>
            </Modal.Footer>
          </Modal>
        </ButtonToolbar>
      </div>
    );
  }

  render() {
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
                  {this.renderBuscador()}
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

export default PainelVisualizador;
