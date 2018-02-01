import React, { Component } from 'react';
import { Row, Col, Nav, NavItem, Tab, NavDropdown, MenuItem } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ImageContainer from '../../../components/ImagesContainer';
import InsumoNecessidade from '../../insumoNecessidade/InsumoNecessidade';
import Sizeme from '../../../components/Sizeme';
import Observacao from '../../../components/Observacao';
import * as observacao from '../../../redux/modules/observacao';
import { listarInsumoNecessidade } from '../../../redux/modules/insumoNecessidade/insumoNecessidade';

const mapStateToProps = state => ({
  observacoes: state.observacao
});

const mapDispatchToProps = dispatch => ({
  list: bindActionCreators(observacao.list, dispatch),
  add: bindActionCreators(observacao.add, dispatch),
  getStObs: bindActionCreators(observacao.getStObs, dispatch),
  listarInsumoNecessidade: bindActionCreators(listarInsumoNecessidade, dispatch)
});

class PainelTotaisOP extends Component {
  state = {
    tabMainKey: '1.1'
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.op !== this.props.op) {
      this.props.list(nextProps.op, false);
      this.props.getStObs(nextProps.op);
      this.props.listarInsumoNecessidade(nextProps.op);
    }
  }

  handleTabMainSelect = (tabMainKey) => {
    this.setState({ tabMainKey });
  }

  renderInsumoOp = () => {
    if (this.props.op) {
      return <InsumoNecessidade ordemProducao={this.props.op} />;
    }
    return null;
  }

  render() {
    const { tabMainKey } = this.state;
    const {
      descEstagio,
      observacoes,
      op,
      imageList
    } = this.props;
    return (
      <div className="painel-totais-op">
        <div className="image-produto-op">
          <ImageContainer imageList={this.props.imageList} />
        </div>
        <Tab.Container activeKey={this.state.tabKey} onSelect={this.handleTabSelect} id="painel-totais-op-main">
          <Row className="clearfix">
            <Col sm={12}>
              <Nav bsStyle="tabs">
                <NavDropdown eventKey="1" title="Observação">
                  <MenuItem eventKey="1.1">Observação</MenuItem>
                  <MenuItem eventKey="1.2">Observação Systextil</MenuItem>
                  <MenuItem eventKey="1.3">Observação PeD</MenuItem>
                </NavDropdown>
                <NavItem eventKey="2">Insumos OP</NavItem>
                <NavItem eventKey="3">Estágio Paralelo</NavItem>
                <NavItem eventKey="4">Grade de Corte</NavItem>
                <NavItem eventKey="5">Observação</NavItem>
                <NavItem eventKey="6">Onde tem</NavItem>
                <NavItem eventKey="7">Filhos</NavItem>
                <NavItem eventKey="8">Log Uti</NavItem>
                <NavItem eventKey="9">Canc. OP</NavItem>
                <NavItem eventKey="10">Altera Período</NavItem>
              </Nav>
            </Col>
            <Col sm={12}>
              <Tab.Content animation>
                <Tab.Pane eventKey="1.1">
                  <Observacao
                    ordemProducao={op}
                    descEstagio={descEstagio}
                    observacoes={observacoes && observacoes.obs}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="1.2">
                  <textarea
                    className="form-control"
                    rows="2"
                    id="observacao-st"
                    name="observacao-st"
                    value={observacoes && observacoes.st}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="1.3">Tab 3.3 content</Tab.Pane>
                <Tab.Pane eventKey="2">
                  <div className="insumo-wrapper">
                    <Sizeme>
                      {this.renderInsumoOp()}
                    </Sizeme>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="3">Painel de Estágio Paralelo</Tab.Pane>
                <Tab.Pane eventKey="4">Painel de Estágio Paralelo</Tab.Pane>
                <Tab.Pane eventKey="5">Painel de Estágio Paralelo</Tab.Pane>
                <Tab.Pane eventKey="6">Painel de Estágio Paralelo</Tab.Pane>
                <Tab.Pane eventKey="7">Painel de Estágio Paralelo</Tab.Pane>
                <Tab.Pane eventKey="8">Painel de Estágio Paralelo</Tab.Pane>
                <Tab.Pane eventKey="9">Painel de Estágio Paralelo</Tab.Pane>
                <Tab.Pane eventKey="10">Painel de Estágio Paralelo</Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PainelTotaisOP);
