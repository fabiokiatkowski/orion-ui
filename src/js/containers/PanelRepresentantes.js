import React, { Component } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import { Tabs, Tab, Form, FormGroup, ControlLabel } from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { listByDate } from '../redux/modules/representante';
import { list } from '../redux/modules/pedidosRecebidos';
import ResizableBox from '../components/ResizableGridWrapper';
import FlipCard from '../components/FlipCard';
import GridRepresentante from './representante/GridRepresentante';
import GridPedidosRecebidos from './pedidosRecebidos/GridPedidosRecebidos';

const ReactGridLayout = WidthProvider(RGL);

const mapDispatchToProps = dispatch => ({
  listByDate: bindActionCreators(listByDate, dispatch),
  list: bindActionCreators(list, dispatch),
});

class PanelRepresentantes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: [
        {
          i: 'representantes', x: 1, y: 0, w: 12, h: 18
        },
        {
          i: 'pedidosRecebidos', x: 0, y: 21, w: 12, h: 12
        }
      ],
      tabMainKey: 1,
      tabChildKey: 11,
      checkboxPedidos: false,
      checkboxAgrupar: true,
      dateFilterFormatted: '14-12-2017' // Usar moment pra formatar o dia atual
    };
  }

  componentDidMount() {
    this.listByDate(this.state.dateFilterFormatted);
  }

  onLayoutChange = () => {
    /* TODO estudar problemas que disparar esse evento pode causar na performance */
    window.dispatchEvent(new Event('resize'));
  }

  listByDate = (dateFilterFormatted) => {
    if (dateFilterFormatted) {
      this.props.listByDate(
        dateFilterFormatted,
        this.state.checkboxPedidos,
        this.state.checkboxAgrupar
      );
    }
  }

  handleRowChange = (data) => {
    const { codigoPeriodo, codigoRepresentante } = data;
    const { dateFilterFormatted } = this.state;
    this.props.list(codigoPeriodo, codigoRepresentante, dateFilterFormatted);
  }

  handleTabMainSelect = (tabMainKey) => {
    this.setState({ tabMainKey });
  }

  handleTabChildSelect = (tabChildKey) => {
    this.setState({ tabChildKey });
  }

  handleOnChageDate = (value, formattedValue) => {
    this.setState({
      dateFilter: value,
      dateFilterFormatted: formattedValue
    });
    this.listByDate(formattedValue);
  }

  handleCheckboxAgrupar = () => {
    this.setState({ checkboxAgrupar: !this.state.checkboxAgrupar }, () => {
      this.listByDate(this.state.dateFilterFormatted)
    });
  }

  handleCheckboxPedidos = () => {
    this.setState({ checkboxPedidos: !this.state.checkboxPedidos }, () => {
      this.listByDate(this.state.dateFilterFormatted)
    });
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
        <ResizableBox key="representantes">
          <GridRepresentante
            handleRowChange={this.handleRowChange}
          />
        </ResizableBox>
        <ResizableBox key="pedidosRecebidos">
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
                value={this.state.dateFilter || new Date().toISOString()}
                dateFormat="DD-MM-YYYY"
                onChange={this.handleOnChageDate}
                todayButtonLabel
              />
            </FormGroup>
            <FormGroup controlId="formInlineCheck1">
              <FlipCard
                dataOff="Agrupar"
                dataOn="Desagrupar"
                handleToggle={this.handleCheckboxAgrupar}
                id="checkboxAgrupar"
                checked={this.state.checkboxAgrupar}
              />
            </FormGroup>
            <FormGroup controlId="formInlineCheck2">
              <FlipCard
                dataOff="Pedidos não Importados"
                dataOn="Pedidos Importados"
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
