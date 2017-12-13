import React, { Component } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import { Tabs, Tab, Form, FormGroup, ControlLabel, Col, Checkbox } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import ResizableBox from '../../components/ResizableGridWrapper';
import GridRepresentante from './GridRepresentante';

const ReactGridLayout = WidthProvider(RGL);

export default class PanelRepresentantes extends Component {
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
      tabChildKey: 11
    };

    this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
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

  handleDatePickerChange(date) {
    this.setState({
      startDate: date
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
        rowHeight={16}
        cols={12}
        onLayoutChange={this.onLayoutChange}
        draggableCancel=".react-grid-Main"
      >
        <ResizableBox key="a">
          <GridRepresentante />
        </ResizableBox>
        <ResizableBox key="b">
          <GridRepresentante />
        </ResizableBox>
        <ResizableBox key="c">
          <GridRepresentante />
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
      <Form inline>
        <FormGroup controlId="formControlsText">
          <ControlLabel>Name</ControlLabel>
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleDatePickerChange}
            className="form-control"
            style={{ width: '100%' }}
          />
        </FormGroup>
      </Form>
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
