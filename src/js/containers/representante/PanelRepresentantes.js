import React, { Component } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import ResizableBox from '../../components/ResizableBox';
import GridRepresentante from './GridRepresentante';

const ReactGridLayout = WidthProvider(RGL);

export default class PanelRepresentantes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: [
        {
          i: 'a', x: 1, y: 0, w: 1, h: 1
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
        isDraggable
        isResizable
        items={3}
        rowHeight={30}
        cols={12}
        onLayoutChange={this.onLayoutChange}
      >
        <ResizableBox key="a">
          <GridRepresentante />
        </ResizableBox>
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