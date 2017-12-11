import React, { Component } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
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
        rowHeight={20}
        cols={12}
        onLayoutChange={this.onLayoutChange}
        draggableCancel=".react-grid-Main"
      >
        <ResizableBox
          key="a"
          data-grid={{
            i: 'a', x: 1, y: 0, w: 12, h: 18
          }}
        >
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
}
