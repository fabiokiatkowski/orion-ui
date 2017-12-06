import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { AgGridReact } from 'ag-grid-react';
import { connect } from 'react-redux';
import { updateRowSelection } from '../redux/modules/agGridXp';

const mapStateToProps = state => ({
  rowData: state.agGridXp.rowData
});

const mapDispatchToProps = dispatch => ({
  updateRowSelection: bindActionCreators(updateRowSelection, dispatch)
});

class GridComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { headerName: 'Sigla', field: 'initials', width: 300 },
        { headerName: 'price', field: 'price', width: 300 },
        { headerName: 'Grupo', field: 'group', width: 300 }
      ]
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
    this.setGroupingEnabled(false);
  }

  onSelectionChanged = () => {
    const selectedRowNodes = this.gridApi.getSelectedNodes();
    const selectedIds = selectedRowNodes.map(rowNode => rowNode.id);

    this.props.updateRowSelection(selectedIds);
  }

  setGroupingEnabled = (enabled) => {
    if (enabled) {
      this.columnApi.addRowGroupColumn('group');
      this.columnApi.setColumnVisible('group', false);
      this.columnApi.setColumnVisible('initials', false);
    } else {
      this.columnApi.removeRowGroupColumn('group');
      this.columnApi.setColumnVisible('group', true);
      this.columnApi.setColumnVisible('initials', true);
    }
  }

  render() {
    return (
      <div style={{height: 400, width: 900, marginTop: 15}} className="ag-theme-bootstrap">
        <AgGridReact
          columnDefs={this.state.columnDefs}
          rowData={this.props.rowData}

          deltaRowDataMode
          animateRows
          enableColResize
          rowSelection="multiple"
          enableRangeSelection
          autoColumnGroupDef={{
            headerName: 'Sigla',
            cellRenderer: 'group',
            field: 'initials'
          }}
          groupDefaultExpanded="1"
          enableSorting
          getRowNodeId={data => data.initials}

          onGridReady={this.onGridReady}
          onSelectionChanged={this.onSelectionChanged}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(GridComponent);

