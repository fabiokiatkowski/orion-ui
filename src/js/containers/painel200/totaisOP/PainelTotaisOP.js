import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import ImageContainer from '../../../components/ImagesContainer';
import InsumoNecessidade from '../../insumoNecessidade/InsumoNecessidade';
import Sizeme from '../../../components/Sizeme';
import Observacao from '../../../components/Observacao';

const MainTabs = (props) => {
  let renderInsumoOp = null;
  if (props.ordemProducao) {
    renderInsumoOp = <InsumoNecessidade ordemProducao={props.ordemProducao} />;
  }
  return (
    <Tabs activeKey={props.tabKey} onSelect={props.handleTabSelect} id="painel-totais-op-main">
      <Tab eventKey={1} title="Observação">
        <Observacao />
      </Tab>
      <Tab eventKey={2} title="Insumos OP">
        <div className="insumo-wrapper">
          {renderInsumoOp}
        </div>
      </Tab>
      <Tab eventKey={3} title="Estágio Paralelo">
        Painel de Estágio Paralelo
      </Tab>
      <Tab eventKey={4} title="Grade de Corte">
        Painel de Grade de Corte
      </Tab>
      <Tab eventKey={5} title="Observação">
        Painel de Observação
      </Tab>
      <Tab eventKey={6} title="Onde Tem">
        Painel de Onde tem
      </Tab>
      <Tab eventKey={7} title="Filhos">
        Painel de Observação
      </Tab>
      <Tab eventKey={8} title="Log Uti">
        Painel de Insumos
      </Tab>
      <Tab eventKey={9} title="Canc. OP">
        Painel de Observação
      </Tab>
      <Tab eventKey={10} title="Altera Período">
        Painel de Insumos
      </Tab>
    </Tabs>
  );
};

class PainelTotaisOP extends Component {
  state = {
    tabMainKey: 1
  }

  handleTabMainSelect = (tabMainKey) => {
    this.setState({ tabMainKey });
  }

  render() {
    const { tabMainKey } = this.state;
    return (
      <div className="painel-totais-op">
        <div className="image-produto-op">
          <ImageContainer imageList={this.props.imageList} />
        </div>
        <MainTabs
          tabKey={tabMainKey}
          handleTabSelect={this.handleTabMainSelect}
          ordemProducao={this.props.op}
        />
      </div>
    );
  }
}

export default PainelTotaisOP;
