import React, { Component } from 'react';
import Dropdown, { DropdownBody, DropdownHeader, DropdownToggle } from '../components/Dropdown';
import DropdownSearch from '../components/DropdownSearch';
import { isEmptyArray } from '../utils/arrays';
import Types from '../utils/filterTypes';

export default class MultiCheckFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: this.getOptions(),
      selected: [],
      advancedFilter: false,
      advancedFilters: []
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({ options: this.getOptions(newProps) });
  }

  onOpen = () => {
    this.setState({ options: this.getOptions() });
  }

  onConfirm = () => {
    const { selected } = this.state;
    this.props.onChange({
      filterTerm: selected,
      column: this.props.column,
      rawValue: selected,
      filterValues: this.filterValues
    });
  };

  getOptions = (newProps) => {
    const props = newProps || this.props;
    let options = props.getValidFilterValues(props.column.key);
    options = options.map((o) => {
      if (typeof o === 'string') {
        return { value: o, label: o };
      }
      if (typeof o === 'number') {
        return { value: o, label: `${o}` };
      }
      return null;
    });
    options.push({ value: '__selectall__', label: 'SELECIONAR TODOS' });
    if (props.column.type === Types.NUMBER) {
      options.sort(this.compareNumber);
    } else {
      options.sort(this.compareText);
    }
    return options;
  }

  compareText = (a, b) => {
    const valueA = a.value;
    const valueB = b.value;
    if (valueA === '__selectall__') {
      return -1;
    }
    if (valueB === '__selectall__') {
      return 1;
    }
    if (valueA < valueB) {
      return -1;
    }
    if (valueA > valueB) {
      return 1;
    }
    return 0;
  }

  compareNumber = (a, b) => {
    const valueA = a.value;
    const valueB = b.value;
    if (valueA === '__selectall__') {
      return -1;
    }
    if (valueB === '__selectall__') {
      return 1;
    }
    return valueA - valueB;
  }

  filterValues = (row, columnFilter, columnKey) => {
    if (columnFilter === null) {
      return false;
    }
    if (!isEmptyArray(columnFilter.filterTerm)) {
      return columnFilter.filterTerm.some((filterTerm) => {
        return filterTerm === row[columnKey];
      });
    }
    return true;
  }

  addOption = (e, item) => {
    const newSelected = [...this.state.selected, item.value];
    this.setState({ selected: newSelected });
  };

  removeOption = (e, item) => {
    const newSelected = this.state.selected.filter(x => x !== item.value);
    this.setState({ selected: newSelected });
  };

  selectAll = (isUsing) => {
    if (isUsing) {
      this.setState({ selected: [] });
    } else {
      const options = this.state.options.map(o => o.value);
      this.setState({ selected: options });
    }
  }

  isUsingOption = (item) => {
    return this.state.selected.some(s => s === item.value);
  };

  toggleOption = (e, isUsing, item) => {
    if (item.value === '__selectall__') {
      this.selectAll(isUsing);
    } else if (isUsing) {
      this.removeOption(e, item);
    } else {
      this.addOption(e, item);
    }
  };

  renderDropdownItem = (item) => {
    const isUsing = this.isUsingOption(item);
    return (
      <a
        className={isUsing ? 'is-active' : ''}
        onClick={e => this.toggleOption(e, isUsing, item)}
      >
        {item.label}
      </a>
    );
  };

  renderHeaderTitle = () => {
    const isAdvanced = this.state.advancedFilter;
    return (
      <div>
        <a
          className={!isAdvanced ? 'is-active' : ''}
          onClick={() => this.setState({ advancedFilter: false })}
        >
          Filtros
        </a>
        <span> | </span>
        <a
          className={isAdvanced ? 'is-active' : ''}
          onClick={() => this.setState({ advancedFilter: true })}
        >
          Avançado
        </a>
      </div>
    );
  };

  renderDropdownWithItems = () => {
    return (
      <DropdownSearch
        placeholder="Pesquisar"
        filterKeys={['value']}
        data={this.state.options}
      >
        <DropdownBody renderItem={this.renderDropdownItem} />
      </DropdownSearch>
    );
  }

  renderAdvancedFilter = () => {
    const textFilter = () => {
      return (
        <div>
          <h3> Filtros coluna {this.props.column.key} </h3>
          <div className="form-inline">
            <div className="form-group mx-sm-3 mb-2">
              <select id="selectFilter" className="form-control">
                <option selected>Menor que</option>
                <option>Maior que</option>
                <option>Contem</option>
              </select>
            </div>
            <div className="form-group mx-sm-3 mb-2">
              <input type="text" className="form-control" id="inputFilterValue" placeholder="Valor" />
            </div>
          </div>

          <div className="form-inline">
            <div className="form-group mx-sm-3 mb-2">
              <select id="selectFilter" className="form-control">
                <option selected>Menor que</option>
                <option>Maior que</option>
                <option>Contem</option>
              </select>
            </div>
            <div className="form-group mx-sm-3 mb-2">
              <input type="text" className="form-control" id="inputFilterValue" placeholder="Valor" />
            </div>
          </div>
        </div>
      );
    };

    const numberFilter = () => {
      return (
        <div>
          <h6> Filtros de numero </h6>
          {this.props.column.key}
        </div>
      );
    };

    const { type } = this.props.column;
    return (
      <div>
        {type === Types.TEXT && textFilter()}
        {type === Types.NUMBER && numberFilter()}
      </div>
    );
  }

  render() {
    const isAdvanced = this.state.advancedFilter;
    return (
      <Dropdown
        onShowDropdown={this.onOpen}
        onConfirm={this.onConfirm}
      >
        <DropdownToggle className="box-control">
          <span className="icon">
            <i className="fa fa-plus" />
          </span>
        </DropdownToggle>
        <DropdownHeader>
          {this.renderHeaderTitle()}
        </DropdownHeader>
        {!isAdvanced ?
          this.renderDropdownWithItems() : this.renderAdvancedFilter()}
      </Dropdown>
    );
  }
}
