import React, { Component } from 'react';
import PropsTypes from 'prop-types';
import ReactDataGrid from 'react-data-grid';
import { Data, DraggableHeader } from 'react-data-grid-addons';
import Toolbar from './Toolbar';

export default class Grid extends Component {
  static propTypes = {
    data: PropsTypes.array, //eslint-disable-line
    columns: PropsTypes.array, //eslint-disable-line
    handleRowChange: PropsTypes.func,
    minHeight: PropsTypes.number,
    onRowsSelected: PropsTypes.func,
    onRowsDeselected: PropsTypes.func,
    indexes: PropsTypes.array, //eslint-disable-line
  }

  static defaultProps = {
    data: [],
    columns: [],
    handleRowChange: () => {},
    minHeight: 50,
    onRowsSelected: () => {},
    onRowsDeselected: () => {}
  }

  constructor(props) {
    super(props);
    this.state = {
      rows: props.data,
      columnsDef: this.getColumns(props.columns),
      sortColumn: null, //eslint-disable-line
      sortDirection: null, //eslint-disable-line
      filters: {},
      rowIdx: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({ rows: nextProps.data });
    }
  }

  onClearFilters = () => {
    this.setState({ filters: {} });
  };

  onCellSelected = ({ rowIdx }) => {
    if (this.state.rowIdx !== rowIdx) {
      const data = this.state.rows[rowIdx];
      this.props.handleRowChange(data);
      this.setState({ rowIdx });
    }
  }

  onColumnResize = (index, newWidth) => {
    const newColumns = this.state.columnsDef;
    newColumns[index].width = newWidth;
    this.props.persistColumns(newColumns);
  }

  onHeaderDrop = (source, target) => {
    const columns = this.state.columnsDef;
    const columnsSourceIndex = columns
      .findIndex(i => i.key === source);
    const columnTardeIndex = columns
      .findIndex(i => i.key === target);
    columns.splice(
      columnTardeIndex,
      0,
      columns.splice(columnsSourceIndex, 1)[0]
    );
    const newState = { ...this.state, columnsDef: columns };
    this.setState({ ...this.state, columnsDef: [] });
    this.setState(newState);
    this.props.persistColumns(columns);
  }

  getColumns = (columnsDef) => {
    const columns = columnsDef
      .filter(column => !column.hidden)
      .sort((a, b) => a.order - b.order);
    return columns;
  }

  getRows = () => {
    return Data.Selectors.getRows(this.state);
  };

  getSize = () => {
    return this.getRows().length;
  };

  getValidFilterValues = (columnId) => {
    const rows = Data.Selectors.getRows(this.state);
    const values = rows.map(r => r[columnId]);
    return values.filter((item, i, a) => {
      return i === a.indexOf(item);
    });
  };

  handleFilterChange = (filter) => {
    const newFilters = { ...this.state.filters };
    if (filter.filterTerm) {
      newFilters[filter.column.key] = filter;
    } else {
      delete newFilters[filter.column.key];
    }
    this.setState({ filters: newFilters });
  };

  handleGridSort = (sortColumn, sortDirection) => {
    this.setState({ sortColumn,  sortDirection }); //eslint-disable-line
  };

  rowGetter = (rowIdx) => {
    const rows = this.getRows();
    return rows[rowIdx];
  };

  render() {
    return (
      <DraggableHeader.DraggableContainer
        onHeaderDrop={this.onHeaderDrop}
      >
        <ReactDataGrid
          minHeight={this.props.minHeight}
          onGridSort={this.handleGridSort}
          columns={this.state.columnsDef}
          rowGetter={this.rowGetter}
          rowsCount={this.getSize()}
          onAddFilter={this.handleFilterChange}
          onClearFilters={this.onClearFilters}
          getValidFilterValues={this.getValidFilterValues}
          toolbar={<Toolbar enableFilter />}
          onCellSelected={this.onCellSelected}
          onColumnResize={this.onColumnResize}
          rowSelection={{
            showCheckbox: true,
            onRowsSelected: this.props.onRowsSelected,
            onRowsDeselected: this.props.onRowsDeselected,
            selectBy: {
              indexes: this.props.indexes
            }
          }}
        />
      </DraggableHeader.DraggableContainer>
    );
  }
}
