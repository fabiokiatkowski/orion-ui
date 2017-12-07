import React from 'react';
import ReactDataGrid from 'react-data-grid';
import { Data, Filters } from 'react-data-grid-addons';
import Toolbar from '../components/Toolbar';

export default class GridBeta extends React.Component {
  constructor() {
    super();
    this.columns = [
      {
        key: 'id',
        name: 'ID',
        width: 120,
        filterable: true,
        filterRenderer: Filters.NumericFilter,
        resizable: true,
        hidden: false
      },
      {
        key: 'task',
        name: 'Title',
        filterable: true,
        resizable: true,
        hidden: false
      },
      {
        key: 'priority',
        name: 'Priority',
        filterable: true,
        filterRenderer: Filters.MultiSelectFilter,
        resizable: true,
        hidden: false
      },
      {
        key: 'issueType',
        name: 'Issue Type',
        filterable: true,
        filterRenderer: Filters.SingleSelectFilter,
        resizable: true,
        hidden: false
      },
      {
        key: 'developer',
        name: 'Developer',
        filterable: true,
        filterRenderer: Filters.AutoCompleteFilter,
        resizable: true,
        hidden: false
      },
      {
        key: 'complete',
        name: '% Complete',
        filterable: true,
        filterRenderer: Filters.NumericFilter,
        resizable: true,
        hidden: true
      },
      {
        key: 'startDate',
        name: 'Start Date',
        filterable: true,
        resizable: true,
        hidden: true
      },
      {
        key: 'completeDate',
        name: 'Expected Complete',
        filterable: true,
        resizable: true,
        hidden: true
      }
    ];

    const rows = this.createRows(1000000);
    this.state = { rows, filters: {}, sortColumn: null, sortDirection: null }
  }

  getRandomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
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

  createRows = (numberOfRows) => {
    const rows = [];
    for (let i = 1; i < numberOfRows; i++) {
      rows.push({
        id: i,
        task: `Task ${i}`,
        complete: Math.min(100, Math.round(Math.random() * 110)),
        priority: ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
        issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)],
        developer: ['James', 'Tim', 'Daniel', 'Alan'][Math.floor((Math.random() * 3) + 1)],
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
    this.setState({ sortColumn,  sortDirection }); //eslint-disable-line
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

  getColumns = () => {
    return this.columns.filter(column => !column.hidden);
  }

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
      />);
  }
}
