import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import { Data, DraggableHeader } from 'react-data-grid-addons';
import {
  Button,
  Modal
} from 'react-bootstrap';
// import ReactDataGrid from 'react-data-grid';
import ReactDataGrid from '../../dependencies/react-data-grid';
import CustomHeaderFormatter from './CustomHeaderFormatter';
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
    showCheckbox: PropTypes.bool,
    reflectShadowRows: PropTypes.func
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
    showCheckbox: false,
    reflectShadowRows: null
  }

  state = {
    shadowRows: fromJS(this.props.data),
    rows: fromJS(this.props.data),
    columnsDef: this.props.columns,
    sortColumn: null, //eslint-disable-line
    sortDirection: null, //eslint-disable-line
    rowIdx: -1,
    filters: '',
    showConfig: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({
        rows: fromJS(nextProps.data),
        shadowRows: fromJS(nextProps.data),
        filters: '',
        rowIdx: -1
      });
      this.cleanFiltesByRef();
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.reflectShadowRows &&
      this.state.shadowRows.size !== nextState.shadowRows.size) {
      this.props.reflectShadowRows(nextState.shadowRows);
    }
  }

  onClearFilters = () => {
    this.setState({ filters: '' });
  };

  onCellSelected = ({ rowIdx }) => {
    if (this.state.rowIdx !== rowIdx) {
      const data = this.state.shadowRows.get(rowIdx);
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
    let columns = columnsDef
      .filter(column => !column.hidden)
      .sort((a, b) => a.order - b.order);
    columns = columns.map((column) => {
      const virtualColumn = column;
      virtualColumn.headerRenderer = (
        <CustomHeaderFormatter
          ref={(instance) => { this.CustomHeaderFormatterRef = instance; }}
          onFilterChange={this.handleFilterChange}
          getValidFilterValues={this.getValidFilterValues}
          sortDirection="NONE"
          onSort={this.handleGridSort}
        />
      );
      return virtualColumn;
    });
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
    return rows.map(r => r.get(columnId)).toSet();
  };

  cleanFilters = () => {
    this.setState({
      rows: fromJS(this.props.data),
      shadowRows: fromJS(this.props.data),
      filters: ''
    });
    this.cleanFiltesByRef();
  };

  /* TODO fix - this remove some first filter */
  cleanFiltesByRef = () => {
    /* TODO ter uma ideia melhor pra resolver isso */
    if (this.CustomHeaderFormatterRef &&
        this.CustomHeaderFormatterRef.FilterRendererRef) {
      this.CustomHeaderFormatterRef.FilterRendererRef.clean();
    }
  }

  handleGridSort = (sortColumn, sortDirection) => {
    this.setState({ sortColumn, sortDirection }, () => {
      this.setState({ shadowRows: Data.Selectors.getRows(this.state) });
    });
  };

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

  rowGetter = (rowIdx) => {
    const rows = this.getRows();
    return rows.get(rowIdx);
  };

  openConfig = () => {
    this.setState({ showConfig: true });
  }

  closeConfig = () => {
    this.setState({ showConfig: false });
  }

  render() {
    return (
      <div>
        <DraggableHeader.DraggableContainer
          onHeaderDrop={this.onHeaderDrop}
        >
          <ReactDataGrid
            canFilter={false}
            contextMenu={
              <CustomContextMenu
                onClearFilters={this.cleanFilters}
                openConfig={this.openConfig}
              />}
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
        <Modal
          show={this.state.showConfig}
          onHide={this.closeConfig}
          dialogClassName="fullscreen-modal-container"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">
              Configurações
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Cofigurações tabajara
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => {}}>Salvar</Button>
            <Button onClick={this.closeConfig}>Fechar</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
