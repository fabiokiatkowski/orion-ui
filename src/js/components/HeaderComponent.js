// ReWrite this components in the wrapper way

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateRowData } from '../redux/modules/agGridXp';

const mapStateToProps = state => ({
  rowData: state.agGridXp.rowData,
  rowSelection: state.agGridXp.rowSelection
});

const mapDispatchToProps = dispatch => ({
  updateRowData: bindActionCreators(updateRowData, dispatch)
});

class HeaderComponent extends Component {
  componentDidMount() {
    this.props.updateRowData(this.createRowData());
  }

  setItemVisible = (id, visible) => {
    const element = document.querySelector(`#${id}`);
    element.style.display = visible ? null : 'none';
  }

  setGroupingEnabled = (enabled) => {
    this.props.setGroupingEnabled(enabled);
    this.setItemVisible('groupingOn', !enabled);
    this.setItemVisible('groupingOff', enabled);
  }

  setSelectedToGroup = (newGroup) => {
    const selectedIds = this.props.rowSelection;
    const newRowData = this.props.rowData.map((dataItem) => {
      const itemSelected = selectedIds.indexOf(dataItem.initials) >= 0;

      if (itemSelected) {
        return {
          initials: dataItem.initials,
          price: dataItem.price,
          group: newGroup
        };
      }
      return dataItem;
    });

    this.props.updateRowData(newRowData);
  }

  removeSelected = () => {
    const newRowData = this.props.rowData.filter((dataItem) => (this.props.rowSelection.indexOf(dataItem.initials) < 0));
    this.props.updateRowData(newRowData);
  }

  addFiveItens = () => {
    const newRowData = this.props.rowData.slice();
    for (let i = 0; i < 5; i += 1) {
      const newItem = this.createItem();
      newRowData.push(newItem);
    }

    this.props.updateRowData(newRowData);
  }

  updatePrices = () => {
    const newRowData = [];
    this.props.rowData.forEach((item) => {
      newRowData.push({ 
        initials: item.initials,
        group: item.group,
        price: Math.floor(Math.random() * 100)
      });
    });

    this.props.updateRowData(newRowData);
  }

  createRowData() {
    const rowData = [];

    for (let i = 0; i < 14; i += 1) {
      const newItem = this.createItem();
      rowData.push(newItem);
    }

    return rowData;
  }

  createItem() {
    const price = Math.floor(Math.random() * 100);
    const group = price > 70 ? 'A' : 'C';

    return {
      group,
      initials: this.createUniqueRandomSymbol(),
      price
    };
  }

  createUniqueRandomSymbol() {
    let initials;
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let isUnique = false;

    const func = (oldItem) => {
      isUnique = oldItem.initials === initials;
    };

    while (!isUnique) {
      initials = '';
      for (let i = 0; i < 3; i += 1) {
        initials += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      isUnique = true;
      this.props.rowData.forEach(func);
    }
    return initials;
  }

  render() {
    return (
      <div style={{marginTop: 15}}>
        <button onClick={this.addFiveItems} style={{marginLeft: 5}}>Add Five Items</button>
        <button onClick={this.removeSelected} style={{marginLeft: 5}}>Remove Selected</button>
        <button onClick={this.updatePrices} style={{marginLeft: 5}}>Update Prices</button>

        <span style={{padding: 10}}/>
        <button id="groupingOn" onClick={() => this.setGroupingEnabled(true)}>
          Ativar agrupamento
        </button>
        <button id="groupingOff" style={{display: "none"}} onClick={() => this.setGroupingEnabled(false)}>
          Desativar Agrupador
        </button>
        <span style={{padding: 10}}/>
        <span style={{border: '1px  solid lightgrey', padding: 4}}>
          Selecionar Grupo:
          <button onClick={() => this.setSelectedToGroup('A')} style={{marginLeft: 5}}>A</button>
          <button onClick={() => this.setSelectedToGroup('B')} style={{marginLeft: 5}}>B</button>
          <button onClick={() => this.setSelectedToGroup('C')} style={{marginLeft: 5}}>C</button>
        </span>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(HeaderComponent);
