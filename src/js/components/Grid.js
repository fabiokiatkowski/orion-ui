import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import { Data, DraggableHeader } from 'react-data-grid-addons';
import ReactDataGrid from 'react-data-grid';
// import ReactDataGrid from '../../dependencies/react-data-grid';
import CustomHeaderCell from './CustomHeaderCell';
import CustomContextMenu from './CustomContextMenu';

export default class Grid extends Component {
  static propTypes = {
    data: PropTypes.array, //eslint-disable-line
    columns: PropTypes.array, //eslint-disable-line
    handleRowChange: PropTypes.func,
    minHeight: PropTypes.number,
    onRowsSelected: PropTypes.func,
    onRowsDeselected: PropTypes.func,
    onRowClick: PropTypes.func,
    indexes: PropTypes.array, //eslint-disable-line
    enableSummary: PropTypes.bool,
    showCheckbox: PropTypes.bool
  }

  static defaultProps = {
    data: [],
    columns: [],
    handleRowChange: () => {},
    minHeight: 50,
    onRowsSelected: () => {},
    onRowsDeselected: () => {},
    onRowClick: () => {},
    enableSummary: false,
    showCheckbox: false
  }

  constructor(props) {
    super(props);
    this.state = {
      shadowRows: fromJS(props.data),
      rows: fromJS(props.data),
      columnsDef: props.columns,
      sortColumn: null, //eslint-disable-line
      sortDirection: null, //eslint-disable-line
      filters: {},
      rowIdx: -1
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({
        rows: fromJS(nextProps.data),
        shadowRows: fromJS(nextProps.data)
      });
    }
  }

  onClearFilters = () => {
    this.setState({ filters: {} });
  };

  onCellSelected = ({ rowIdx }) => {
    if (this.state.rowIdx !== rowIdx) {
      const data = this.state.rows.get(rowIdx);
      this.props.handleRowChange(data);
      this.setState({ rowIdx });
    }
  }

  onColumnResize = (index, newWidth) => {
    const newColumns = this.state.columnsDef;
    newColumns[index].width = newWidth;
  }

  onHeaderDrop = (source, target) => {
    const columns = this.state.columnsDef;
    const columnsSourceIndex = columns
      .findIndex(i => i.key === source);
    const columnTargetIndex = columns
      .findIndex(i => i.key === target);

    const orderSource = columns[columnsSourceIndex].order;
    const orderTarget = columns[columnTargetIndex].order;
    columns[columnsSourceIndex].order = orderTarget;
    columns[columnTargetIndex].order = orderSource;

    const newState = { ...this.state, columnsDef: columns };
    this.setState({ ...this.state, columnsDef: [] });
    this.setState(newState);
  }

  getColumns = (columnsDef) => {
    const columns = columnsDef
      .filter(column => !column.hidden)
      .sort((a, b) => a.order - b.order);
    return columns;
  }

  getRows = () => {
    return this.state.shadowRows;
  };

  getSize = () => {
    return this.getRows().size;
  };

  getValidFilterValues = (columnId) => {
    const rows = Data.Selectors.getRows(this.state);
    const values = rows.map(r => r.get(columnId));
    return values.filter((item, i, a) => {
      return i === a.indexOf(item);
    });
  };

  cleanFilters = () => {
    this.setState({ filters: {} }, () => {
      this.setState({ shadowRows: Data.Selectors.getRows(this.state) });
    });
  }

  handleFilterChange = (filter) => {
    if (filter) {
      const newFilters = { ...this.state.filters };
      if (filter.filterTerm) {
        newFilters[filter.column.key] = filter;
      } else {
        delete newFilters[filter.column.key];
      }
      this.setState({ filters: newFilters }, () => {
        this.setState({ shadowRows: Data.Selectors.getRows(this.state) });
      });
    }
  };

  handleGridSort = (sortColumn, sortDirection) => {
    this.setState({ sortColumn, sortDirection }, () => {
      this.setState({ shadowRows: Data.Selectors.getRows(this.state) });
    });
  };

  rowGetter = (rowIdx) => {
    const rows = this.getRows();
    return rows.get(rowIdx);
  };

  render() {
    return (
      <DraggableHeader.DraggableContainer
        onHeaderDrop={this.onHeaderDrop}
      >
        <ReactDataGrid
          contextMenu={
            <CustomContextMenu onClearFilters={this.cleanFilters} />
          }
          canFilter={false}
          minHeight={this.props.minHeight}
          onGridSort={this.handleGridSort}
          columns={this.getColumns(this.state.columnsDef)}
          rowHeight={30}
          rowGetter={this.rowGetter}
          rowsCount={this.getSize()}
          onAddFilter={this.handleFilterChange}
          onClearFilters={this.onClearFilters}
          getValidFilterValues={this.getValidFilterValues}
          onCellSelected={this.onCellSelected}
          onColumnResize={this.onColumnResize}
          onRowClick={this.props.onRowClick}
          headerRenderer={CustomHeaderCell}
          enableSummary={this.props.enableSummary}
          rowSelection={{
            showCheckbox: this.props.showCheckbox,
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
