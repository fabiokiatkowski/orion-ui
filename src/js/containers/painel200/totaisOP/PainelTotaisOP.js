import React, { Component } from 'react';
import { Row, Col, Nav, NavItem, Tab, NavDropdown, MenuItem } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import ImageContainer from '../../../components/ImagesContainer';
import InsumoNecessidade from '../../insumoNecessidade/InsumoNecessidade';
import Observacao from '../../../components/Observacao';
import InsumoDeposito from '../../insumoNecessidade/InsumoDeposito';
import InsumoRolos from '../../insumoNecessidade/InsumoRolos';
import { listarGradeCorte } from '../../../redux/modules/tela200';
import * as observacao from '../../../redux/modules/observacao';
import { listarInsumoNecessidade } from '../../../redux/modules/insumoNecessidade/insumoNecessidade';
import GradeCorte from './gradeCorte/GradeCorte';
import fixReferencia from '../../../utils/referencia';
import GridEstagioParalelo from './estagioParalelo/GridEstagioParalelo';
import GridOndeTem from './ondeTem/GridOndeTem';
import GridFilhos from './filhos/GridFilhos';
import GridLogUti from './logUti/GridLogUti';

const mapStateToProps = state => ({
  observacoes: state.observacao
});

const mapDispatchToProps = dispatch => ({
  list: bindActionCreators(observacao.list, dispatch),
  add: bindActionCreators(observacao.add, dispatch),
  getStObs: bindActionCreators(observacao.getStObs, dispatch),
  listarInsumoNecessidade:
    bindActionCreators(listarInsumoNecessidade, dispatch),
  listPeD: bindActionCreators(observacao.listPeD, dispatch),
  listarInfoGridCorte: bindActionCreators(listarGradeCorte, dispatch)
});

class PainelTotaisOP extends Component {
  state = {
    tabMainKey: '1.1'
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.row &&
        nextProps.row.get('ordemProducao') !== this.props.row.get('ordemProducao')) {
      this.props.list(nextProps.row.get('ordemProducao'), false);
      this.props.getStObs(nextProps.row.get('ordemProducao'));
      this.props.listarInsumoNecessidade(nextProps.row.get('ordemProducao'));
      this.props.listarInfoGridCorte(nextProps.row.get('ordemProducao'));
    }
    if (nextProps.referencia !== this.props.referencia) {
      this.props.listPeD(fixReferencia(nextProps.referencia));
    }
  }

  handleTabMainSelect = (tabMainKey) => {
    this.setState({ tabMainKey });
  }

  render() {
    if (!this.props.row) {
      return null;
    }
    const { tabMainKey } = this.state;
    const { imageList, observacoes } = this.props;
    const descricaoEstagio = this.props.row.get('descodEstagio');
    const ordemProducao = this.props.row.get('ordemProducao');
    const ordemPrincipal = this.props.row.get('ordemPrincipal');
    const item = this.props.row.get('proconfItem');
    const referencia = this.props.row.get('referenciaPeca');

    let observacaoRender = null;
    let observacaoSystextilRender = null;
    let observacaoPEDRender = null;
    if (observacoes) {
      observacaoRender = (
        <Observacao
          ordemProducao={ordemProducao}
          descEstagio={descricaoEstagio}
          observacoes={observacoes.obs}
          canAdd
        />
      );
      observacaoSystextilRender = (
        <textarea
          className="form-control"
          rows="2"
          id="observacao-st"
          name="observacao-st"
          value={observacoes && observacoes.systextil}
        />
      );
      observacaoPEDRender = (
        <Observacao
          observacoes={observacoes && observacoes.ped}
        />
      );
    }

    return (
      <div>
        <div className="painel-totais-op">
          <div className="image-produto-op">
            <ImageContainer imageList={this.props.imageList} showHeader />
          </div>
          <Tab.Container
            activeKey={this.state.tabKey}
            onSelect={this.handleTabSelect}
            id="painel-totais-op-main"
          >
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
                  <NavItem eventKey="5">Onde Tem</NavItem>
                  <NavItem eventKey="6">Filhos</NavItem>
                  <NavItem eventKey="7">Log Uti</NavItem>
                  <NavItem eventKey="8">Altera Período</NavItem>
                </Nav>
              </Col>
              <Col sm={12}>
                <Tab.Content animation>
                  <Tab.Pane eventKey="1.1">
                    {observacaoRender}
                  </Tab.Pane>
                  <Tab.Pane eventKey="1.2">
                    {observacaoSystextilRender}
                  </Tab.Pane>
                  <Tab.Pane eventKey="1.3">
                    {observacaoPEDRender}
                  </Tab.Pane>
                  <Tab.Pane eventKey="2">
                    <div className="insumo-wrapper">
                      <InsumoNecessidade ordemProducao={ordemProducao} />
                      <InsumoDeposito data={[]} />
                      <InsumoRolos data={[]} />
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
                  </Tab.Pane>
                  <Tab.Pane eventKey="3">
                    <GridEstagioParalelo
                      ordemProducao={ordemProducao}
                      grupo={referencia}
                      item={item}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="4">
                    <GradeCorte ordemProducao={ordemProducao} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="5">
                    <GridOndeTem
                      ordemProducao={ordemProducao}
                      grupo={referencia}
                      item={item}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="6">
                    <GridFilhos ordemPrincipal={ordemPrincipal} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="7">
                    <GridLogUti ordemProducao={ordemProducao} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="8">Painel de Estágio Paralelo 10</Tab.Pane>
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
  listarInfoGridCorte: PropTypes.func,
  referencia: PropTypes.string,
  row: PropTypes.instanceOf(Immutable.Map),
  list: PropTypes.func,
  getStObs: PropTypes.func,
  listarInsumoNecessidade: PropTypes.func,
  listPeD: PropTypes.func,
  observacoes: PropTypes.shape({
    obs: PropTypes.array,
    ped: PropTypes.array,
    systextil: PropTypes.string
  })
};

PainelTotaisOP.defaultProps = {
  imageList: [],
  row: [],
  referencia: '',
  list: () => {},
  getStObs: () => {},
  listarInsumoNecessidade: () => {},
  listPeD: () => {},
  listarInfoGridCorte: () => {},
  observacoes: {
    obs: [],
    ped: [],
    systextil: ''
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PainelTotaisOP);
