import React from 'react';
import ReactDataGrid from 'react-data-grid';
import { Data } from 'react-data-grid-addons';
import Toolbar from '../components/Toolbar';

export default class GridBeta extends React.Component {
  constructor() {
    super();
    this.columns = [
      {
        key: 'id',
        name: 'ID',
        width: 80,
        filterable: true,
        sortable: true
      },
      {
        key: 'task',
        name: 'Title',
        filterable: true,
        sortable: true
      },
      {
        key: 'priority',
        name: 'Priority',
        filterable: true,
        sortable: true
      },
      {
        key: 'issueType',
        name: 'Issue Type',
        filterable: true,
        sortable: true
      },
      {
        key: 'complete',
        name: '% Complete',
        filterable: true,
        sortable: true
      },
      {
        key: 'startDate',
        name: 'Start Date',
        filterable: true,
        sortable: true
      },
      {
        key: 'completeDate',
        name: 'Expected Complete',
        filterable: true,
        sortable: true
      }
    ];

    const rows = this.createRows();
    this.state = { rows, filters: {}, sortColumn: null, sortDirection: null }
  }

  onClearFilters = () => {
    this.setState({ filters: {} });
  };

  getRandomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
  }

  getRows = () => {
    return Data.Selectors.getRows(this.state);
  };

  getSize = () => {
    return this.getRows().length;
  };

  createRows = () => {
    const rows = [];
    for (let i = 1; i < 1000; i += 1) {
      rows.push({
        id: i,
        task: `Task   ${i}`,
        complete: Math.min(100, Math.round(Math.random() * 110)),
        priority: ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
        issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)],
        startDate: this.getRandomDate(new Date(2015, 3, 1), new Date()),
        completeDate: this.getRandomDate(new Date(), new Date(2016, 0, 1))
      });
    }
    return rows;
  };

  rowGetter = (rowIdx) => {
    const rows = this.getRows();
    return rows[rowIdx];
  };

  handleGridSort = (sortColumn, sortDirection) => {
    this.setState({ sortColumn,  sortDirection });
  };

  handleFilterChange = (filter) => {
    const newFilters = Object.assign({}, this.state.filters);
    if (filter.filterTerm) {
      newFilters[filter.column.key] = filter;
    } else {
      delete newFilters[filter.column.key];
    }
    this.setState({ filters: newFilters });
  };

  render() {
    return (
      <ReactDataGrid
        onGridSort={this.handleGridSort}
        columns={this.columns}
        rowGetter={this.rowGetter}
        enableCellSelect
        rowsCount={this.getSize()}
        minHeight={500}
        onAddFilter={this.handleFilterChange}
        onClearFilters={this.onClearFilters}
        toolbar={<Toolbar />}
      />);
  }
}