import React, { Component } from 'react';
import HeaderComponent from '../components/HeaderComponent';
import GridComponent from '../components/AgComponent';

export default class AgGridXp extends Component {
  setGroupingEnabled = (enabled) => {
    this.grid.setGroupingEnabled(enabled);
  }
  render() {
    return (
      <div>
        <HeaderComponent setGroupingEnabled={this.setGroupingEnabled} />
        <GridComponent ref={(grid) => {
          this.grid = grid ? grid.getWrappedInstance() : null;
        }}
        />
      </div>
    );
  }
}
