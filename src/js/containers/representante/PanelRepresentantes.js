import React, { Component } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import GridRepresentante from './GridRepresentante';

const ReactGridLayout = WidthProvider(RGL);

export default class PanelRepresentantes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: [
        {
          i: 'a', x: 1, y: 0, w: 12, h: 3
        },
        {
          i: 'b', x: 1, y: 0, w: 3, h: 10
        },
        {
          i: 'c', x: 1, y: 0, w: 3, h: 10
        }
      ]
    };
  }

  onLayoutChange = () => {
    /* TODO estudar problemas que disparar esse evento pode causar na performance */
    window.dispatchEvent(new Event('resize'));
  }

  render() {
    return (
      <ReactGridLayout
        className="layout"
        layout={this.state.layout}
        onLayoutChange={this.onLayoutChange}
        isDraggable
        isResizable
        items={3}
        onResizeStop={(e) => { console.log(e)}}
      >
        <div key="a">
          <GridRepresentante height="500" width="100" />
        </div>
        <div key="b">
          <GridRepresentante />
        </div>
        <div key="c">
          <GridRepresentante />
        </div>
      </ReactGridLayout>
    );
  }
}