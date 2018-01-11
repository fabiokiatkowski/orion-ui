import React, { Component } from 'react';
import PropsTypes from 'prop-types';
import ReactDataGrid from 'react-data-grid';
import { Data } from 'react-data-grid-addons';
import Toolbar from './Toolbar';

export default class Grid extends Component {
  static propTypes = {
    data: PropsTypes.array, //eslint-disable-line
    columns: PropsTypes.array, //eslint-disable-line
    handleRowChange: PropsTypes.func,
    minHeight: PropsTypes.number
  }

  static defaultProps = {
    data: [],
    columns: [],
    handleRowChange: () => {},
    minHeight: 50
  }

  constructor(props) {
    super(props);
    this.state = {
      rows: props.data,
      columnsDef: props.columns,
      sortColumn: null, //eslint-disable-line
      sortDirection: null, //eslint-disable-line
      filters: {},
      rowIdx: 0,
      virtualRows: props.data
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
      <ReactDataGrid
        minHeight={this.props.minHeight}
        onGridSort={this.handleGridSort}
        columns={this.getColumns()}
        rowGetter={this.rowGetter}
        rowsCount={this.getSize()}
        onAddFilter={this.handleFilterChange}
        onClearFilters={this.onClearFilters}
        getValidFilterValues={this.getValidFilterValues}
        toolbar={<Toolbar enableFilter />}
        onCellSelected={this.onCellSelected}
      />
    );
  }
}
