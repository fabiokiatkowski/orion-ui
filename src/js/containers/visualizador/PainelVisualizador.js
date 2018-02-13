import React, { Component } from 'react';
import {
  Row,
  Col,
  Nav,
  NavItem,
  Tab } from 'react-bootstrap';
import Localizador from './Localizador';

class PainelVisualizador extends Component {
  state = { teste: false }

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
                  <Localizador />
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
