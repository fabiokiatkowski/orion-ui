import React, { Component } from 'react';
import { Row, Col, Nav, NavItem, Tab, NavDropdown, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import ObservacaoTypes from '../../../types/ObservacaoTypes';
import ImageContainer from '../../../components/ImagesContainer';
import InsumoNecessidade from '../../insumoNecessidade/InsumoNecessidade';
import Observacao200 from './Observacao200';
import InsumoDeposito from '../../insumoNecessidade/InsumoDeposito';
import InsumoRolos from '../../insumoNecessidade/InsumoRolos';
import GradeCorte from './gradeCorte/GradeCorte';
import GridEstagioParalelo from './estagioParalelo/GridEstagioParalelo';
import GridOndeTem from './ondeTem/GridOndeTem';
import GridFilhos from './filhos/GridFilhos';
import GridLogUti from './logUti/GridLogUti';

const mapStateToProps = state => ({
  observacoes: state.observacao
});

class PainelTotaisOP extends Component {
  state = {
    tabMainKey: 11
  }

  handleTabMainSelect = (tabMainKey) => {
    this.setState({ tabMainKey });
  }

  render() {
    if (!this.props.row) {
      return null;
    }
    const { tabMainKey } = this.state;
    const { imageList } = this.props;
    const descricaoEstagio = this.props.row.get('descodEstagio');
    const ordemProducao = this.props.row.get('ordemProducao');
    const ordemPrincipal = this.props.row.get('ordemPrincipal');
    const item = this.props.row.get('proconfItem');
    const referencia = this.props.row.get('referenciaPeca');

    let observacaoRender = null;
    let observacaoSystextilRender = null;
    let observacaoPEDRender = null;
    observacaoRender = (
      <Observacao200
        ordemProducao={ordemProducao}
        descEstagio={descricaoEstagio}
        observacaoType={ObservacaoTypes.ORION}
      />
    );
    observacaoSystextilRender = (
      <Observacao200
        ordemProducao={ordemProducao}
        observacaoType={ObservacaoTypes.SYSTEXTIL}
      />
    );
    observacaoPEDRender = (
      <Observacao200
        referencia={referencia}
        observacaoType={ObservacaoTypes.PeD}
      />
    );

    return (
      <div>
        <div className="painel-totais-op">
          <div className="image-produto-op">
            <ImageContainer nivel="1" grupo={referencia} showHeader />
          </div>
          <Tab.Container
            activeKey={tabMainKey}
            onSelect={this.handleTabMainSelect}
            id="painel-totais-op-main"
          >
            <Row className="clearfix">
              <Col sm={12}>
                <Nav bsStyle="tabs">
                  <NavDropdown eventKey={1} title="Observação">
                    <MenuItem eventKey={11}>Observação</MenuItem>
                    <MenuItem eventKey={12}>Observação Systextil</MenuItem>
                    <MenuItem eventKey={13}>Observação PeD</MenuItem>
                  </NavDropdown>
                  <NavItem eventKey={2}>Insumos OP</NavItem>
                  <NavItem eventKey={3}>Estágio Paralelo</NavItem>
                  <NavItem eventKey={4}>Grade de Corte</NavItem>
                  <NavItem eventKey={5}>Onde Tem</NavItem>
                  <NavItem eventKey={6}>Filhos</NavItem>
                  <NavItem eventKey={7}>Log Uti</NavItem>
                  <NavItem eventKey={8}>Altera Período</NavItem>
                </Nav>
              </Col>
              <Col sm={12}>
                <Tab.Content animation>
                  <Tab.Pane eventKey={11}>
                    {tabMainKey === 11 && observacaoRender}
                  </Tab.Pane>
                  <Tab.Pane eventKey={12}>
                    {tabMainKey === 12 && observacaoSystextilRender}
                  </Tab.Pane>
                  <Tab.Pane eventKey={13}>
                    {tabMainKey === 13 && observacaoPEDRender}
                  </Tab.Pane>
                  <Tab.Pane eventKey={2}>
                    {
                      tabMainKey === 2 &&
                      <div className="insumo-wrapper">
                        <InsumoNecessidade
                          minHeight={this.props.minHeight - 20}
                          ordemProducao={ordemProducao}
                        />
                        <InsumoDeposito
                          minHeight={this.props.minHeight - 140}
                          data={[]}
                        />
                        <InsumoRolos
                          minHeight={this.props.minHeight - 150}
                          data={[]}
                        />
                        <div className="image-produto-op insumo-image">
                          <ImageContainer imageList={imageList} />
                        </div>
                        <div className="observacao-rolo">
                          <textarea
                            className="observacao-insumo"
                            name="observacao"
                            id="observacao"
                            cols="30"
                            rows="5"
                            disabled
                          />
                        </div>
                      </div>
                    }
                  </Tab.Pane>
                  <Tab.Pane eventKey={3}>
                    {
                      tabMainKey === 3 &&
                      <GridEstagioParalelo
                        minHeight={this.props.minHeight}
                        ordemProducao={ordemProducao}
                        grupo={referencia}
                        item={item}
                      />
                    }
                  </Tab.Pane>
                  <Tab.Pane eventKey={4}>
                    {tabMainKey === 4 &&
                      <GradeCorte ordemProducao={ordemProducao} />}
                  </Tab.Pane>
                  <Tab.Pane eventKey={5}>
                    {
                      tabMainKey === 5 &&
                        <GridOndeTem
                          minHeight={this.props.minHeight - 35}
                          ordemProducao={ordemProducao}
                          grupo={referencia}
                          item={item}
                        />
                    }
                  </Tab.Pane>
                  <Tab.Pane eventKey={6}>
                    {tabMainKey === 6 &&
                      <GridFilhos
                        minHeight={this.props.minHeight}
                        ordemPrincipal={ordemPrincipal}
                      />}
                  </Tab.Pane>
                  <Tab.Pane eventKey={7}>
                    {tabMainKey === 7 &&
                      <GridLogUti
                        minHeight={this.props.minHeight}
                        ordemProducao={ordemProducao}
                      />}
                  </Tab.Pane>
                  <Tab.Pane eventKey={8}>
                    Painel de Estágio Paralelo 10
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

PainelTotaisOP.propTypes = {
  imageList: PropTypes.array,
  row: PropTypes.instanceOf(Immutable.Map),
  minHeight: PropTypes.number
};

PainelTotaisOP.defaultProps = {
  imageList: [],
  row: [],
  minHeight: 0
};

export default connect(mapStateToProps, null)(PainelTotaisOP);
