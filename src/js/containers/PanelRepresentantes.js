import React, { Component } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import { Tabs, Tab, Form, FormGroup, ControlLabel } from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { listByDate } from '../redux/modules/representante';
import ResizableBox from '../components/ResizableGridWrapper';
import FlipCard from '../components/FlipCard';
import GridRepresentante from './representante/GridRepresentante';
import GridPedidosRecebidos from './pedidosRecebidos/GridPedidosRecebidos';

const ReactGridLayout = WidthProvider(RGL);

const mapDispatchToProps = dispatch => ({
  listByDate: bindActionCreators(listByDate, dispatch),
});

class PanelRepresentantes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: [
        {
          i: 'a', x: 1, y: 0, w: 12, h: 18
        },
        {
          i: 'b', x: 0, y: 21, w: 4, h: 12
        },
        {
          i: 'c', x: 4, y: 21, w: 8, h: 12
        }
      ],
      tabMainKey: 1,
      tabChildKey: 11,
      checkboxPedidos: false,
      checkboxAgrupar: false
    };
  }

  onLayoutChange = () => {
    /* TODO estudar problemas que disparar esse evento pode causar na performance */
    window.dispatchEvent(new Event('resize'));
  }

  handleTabMainSelect = (tabMainKey) => {
    this.setState({ tabMainKey });
  }

  handleTabChildSelect = (tabChildKey) => {
    this.setState({ tabChildKey });
  }

  handleOnChageDate = (value, formattedValue) => {
    this.setState({ dateFilter: value });
    this.props.listByDate(formattedValue);
  }

  handleCheckboxAgrupar = () => {
    this.setState({ checkboxAgrupar: !this.state.checkboxAgrupar });
  }

  handleCheckboxPedidos = () => {
    this.setState({ checkboxPedidos: !this.state.checkboxPedidos });
  }

  renderRepresentante = () => {
    return (
      <ReactGridLayout
        className="layout"
        layout={this.state.layout}
        isDraggable
        isResizable
        items={3}
        rowHeight={12}
        cols={12}
        onLayoutChange={this.onLayoutChange}
        draggableCancel=".react-grid-Main"
      >
        <ResizableBox key="a">
          <GridRepresentante />
        </ResizableBox>
        <ResizableBox key="b">
          <GridPedidosRecebidos />
        </ResizableBox>
        <ResizableBox key="c">
          <GridPedidosRecebidos />
        </ResizableBox>
      </ReactGridLayout>
    );
  }

  renderPedidos = () => {
    return (<h1>Pedidos</h1>);
  }

  renderTodosRepresentantes = () => {
    return (<h1>Todos Representantes</h1>);
  }

  renderConsultaDiaDia = () => {
    return (
      <div className="panel panel-default panel-representates">
        <div className="panel-body">
          <Form inline>
            <FormGroup controlId="formInlineDate">
              <ControlLabel className="panel-representates-data-label">
                Data
              </ControlLabel>
              <DatePicker
                value={this.state.dateFilter}
                dateFormat="DD-MM-YYYY"
                onChange={this.handleOnChageDate}
              />
            </FormGroup>
            <FormGroup controlId="formInlineCheck1">
              <FlipCard
                dataOff="Agrupar"
                dataOn="Agrupar"
                handleToggle={this.handleCheckboxAgrupar}
                id="checkboxAgrupar"
                checked={this.state.checkboxAgrupar}
              />
            </FormGroup>
            <FormGroup controlId="formInlineCheck2">
              <FlipCard
                dataOff="Pedidos no sistema"
                dataOn="Pedidos no sistema"
                handleToggle={this.handleCheckboxPedidos}
                id="checkboxPedidos"
                checked={this.state.checkboxPedidos}
              />
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }

  render() {
    return (
      <Tabs activeKey={this.state.tabMainKey} onSelect={this.handleTabMainSelect} id="controlled-tab-pai">
        <Tab eventKey={1} title="Consultas">
          <Tabs activeKey={this.state.tabSearchKey} onSelect={this.handleTabSearchSelect} id="controlled-tab-3" >
            <Tab eventKey={21} title="Consulta dia a dia">
              {this.renderConsultaDiaDia()}
            </Tab>
            <Tab eventKey={22} title="Consulta no periodo">
              <h1>...</h1>
            </Tab>
          </Tabs>
          <Tabs activeKey={this.state.tabChildKey} onSelect={this.handleTabChildSelect} id="controlled-tab-2">
            <Tab eventKey={11} title="Representante">
              {this.renderRepresentante()}
            </Tab>
            <Tab eventKey={12} title="Pedidos">
              {this.renderPedidos()}
            </Tab>
            <Tab eventKey={13} title="Todos Representantes">
              {this.renderTodosRepresentantes()}
            </Tab>
          </Tabs>
        </Tab>
        <Tab eventKey={2} title="Pedidos não integrados">
          Não implementado ainda...
        </Tab>
      </Tabs>
    );
  }
}

export default connect(null, mapDispatchToProps)(PanelRepresentantes);
