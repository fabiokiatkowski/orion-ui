import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import { Data } from 'react-data-grid-addons';
import Toolbar from './Toolbar';

export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: props.data,
      columnsDef: props.columns,
      sortColumn: null, //eslint-disable-line
      sortDirection: null, //eslint-disable-line
      filters: {},
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.length !== this.props.data.length) {
      this.setState({ rows: nextProps.data });
    }
  }

  onClearFilters = () => {
    this.setState({ filters: {} });
  };

  getColumns = () => {
    return this.state.columnsDef.filter(column => !column.hidden);
  }

  getRows = () => {
    return Data.Selectors.getRows(this.state);
  };

  getSize = () => {
    return this.getRows().length;
  };

  getValidFilterValues = (columnId) => {
    const values = this.state.rows.map(r => r[columnId]);
    return values.filter((item, i, a) => { return i === a.indexOf(item); });
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
      <ReactDataGrid
        onGridSort={this.handleGridSort}
        columns={this.getColumns()}
        rowGetter={this.rowGetter}
        enableCellSelect
        rowsCount={this.getSize()}
        minHeight={500}
        onAddFilter={this.handleFilterChange}
        onClearFilters={this.onClearFilters}
        getValidFilterValues={this.getValidFilterValues}
        toolbar={<Toolbar />}
      />
    );
  }
}
