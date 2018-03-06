import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import { Data } from 'react-data-grid-addons';
import {
  Button,
  Modal
} from 'react-bootstrap';
// import ReactDataGrid from 'react-data-grid';
import ReactDataGrid from '../../dependencies/react-data-grid';
import CustomHeaderFormatter from './CustomHeaderFormatter';
import GridContextMenu from './GridContextMenu';
import ColumnsConfig from './ColumnsConfig';
import { getCurrentColumns, updateColumns } from '../utils/gridProfile';
import IntegerFormat from './NumeralFormat';
import { SummaryCount, SummaryAverage, SummaryDistinctCount, SummarySum } from './Summary';

export default class Grid extends Component {
  static propTypes = {
    data: PropTypes.array, //eslint-disable-line
    handleRowChange: PropTypes.func,
    minHeight: PropTypes.number,
    onRowsSelected: PropTypes.func,
    onRowsDeselected: PropTypes.func,
    onRowClick: PropTypes.func,
    indexes: PropTypes.array, //eslint-disable-line
    enableSummary: PropTypes.bool,
    showCheckbox: PropTypes.bool,
    reflectShadowRows: PropTypes.func,
    gridName: PropTypes.string.isRequired
  }

  static defaultProps = {
    data: [],
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
    rows: fromJS(this.props.data), //eslint-disable-line 
    columnsDef: [],
    rawColumnsDef: [],
    sortColumn: null, //eslint-disable-line
    sortDirection: null, //eslint-disable-line
    rowIdx: -1,
    filters: '',
    showConfig: false,
    showContextMenu: false,
    contextMenuScreenX: null,
    contextMenuScreenY: null
  };

  componentDidMount() {
    getCurrentColumns(this.props.gridName)
      .then((res) => {
        this.setState({
          columnsDef: this.getColumns(res.data),
          rawColumnsDef: res.data,
        }, () => {
          /* POG - data grid não renderiza novamente se mudar apenas a ordem das colunas */
          window.dispatchEvent(new Event('resize'));
        });
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({
        rows: fromJS(nextProps.data), //eslint-disable-line
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

  onContextMenu = (e) => {
    e.stopPropagation();
    e.preventDefault();
    this.setState({
      showContextMenu: true,
      contextMenuScreenX: e.screenX,
      contextMenuScreenY: e.screenY
    });
  }

  getSummary = (summaryType) => {
    switch (`${summaryType}`) {
      case '1': return SummaryCount;
      case '2': return SummaryDistinctCount;
      case '3': return SummaryAverage;
      case '4': return SummarySum;
      default: return null;
    }
  }

  getColumns = (definitions) => {
    let columns = definitions
      .filter(column => !column.hidden)
      .sort((a, b) => a.position - b.position);
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
      if (column.summary_index) {
        console.log('summary_index', column.summary_index);
        virtualColumn.summary = this.getSummary(column.summary_index);
      }
      if (column.formatter_index) {
        virtualColumn.formatter = IntegerFormat;/* Just exists a formatter until now */
      }
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
      rows: fromJS(this.props.data), //eslint-disable-line
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
    this.setState({ sortColumn, sortDirection }, () => { //eslint-disable-line
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

  handleChangeColunsDef = (items) => {
    this.setState({ rawColumnsDef: items });
  }

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

  saveConfig = () => {
    updateColumns(this.state.rawColumnsDef);
    const newState = {
      ...this.state,
      columnsDef: this.getColumns(this.state.rawColumnsDef)
    };
    this.setState(newState, () => {
      /* POG - data grid não renderiza novamente se mudar apenas a ordem das colunas */
      window.dispatchEvent(new Event('resize'));
    });
  }

  closeContextMenu = () => {
    this.setState({ showContextMenu: false });
  }

  render() {
    return (
      <div onContextMenu={this.onContextMenu}>
        <ReactDataGrid
          canFilter={false}
          minHeight={this.props.minHeight}
          onGridSort={this.handleGridSort}
          columns={this.state.columnsDef}
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
        <Modal
          show={this.state.showConfig}
          onHide={this.closeConfig}
          dialogClassName="fullscreen-modal-container"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Configurações
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ColumnsConfig
              columns={this.state.rawColumnsDef}
              onChange={this.handleChangeColunsDef}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.saveConfig}>Salvar</Button>
            <Button onClick={this.closeConfig}>Fechar</Button>
          </Modal.Footer>
        </Modal>
        {this.state.showContextMenu &&
          <GridContextMenu
            onClearFilters={this.cleanFilters}
            openConfig={this.openConfig}
            onClose={this.closeContextMenu}
            screenX={this.state.contextMenuScreenX}
            screenY={this.state.contextMenuScreenY}
          />
        }
      </div>
    );
  }
}
