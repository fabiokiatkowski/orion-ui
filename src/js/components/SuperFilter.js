import React, { Component } from 'react';
import joinClasses from 'classnames';
import Dropdown, { DropdownBody, DropdownHeader, DropdownToggle } from '../components/Dropdown';
import DropdownSearch from '../components/DropdownSearch';
import { isEmptyArray } from '../utils/arrays';
import Types from '../utils/filterTypes';

export default class SuperFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: this.getOptions(),
      selected: [],
      advancedFilter: false,
      advancedFilters: [
        {
          advancedFilterOption: 1,
          advancedFilterType: 1,
          advancedFilterValue: null
        }
      ],
      hasFilter: false
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
    this.setState({ hasFilter: this.hasFilter() });
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

  validateFiltersText = (value) => {
    let actualCondition = true;
    this.state.advancedFilters.forEach((a) => {
      const loopValue = a.advancedFilterValue;
      let loopCondition = true;

      if (!loopValue) {
        loopCondition = true;
      } else if (a.advancedFilterType == 1) {
        loopCondition = value.includes(loopValue.toUpperCase());
      } else if (a.advancedFilterType == 2) {
        const stringA = String(value).trim();
        const stringB = String(loopValue.toUpperCase()).trim();
        loopCondition = (stringA === stringB);
      }

      if (a.advancedFilterOption == 1) {
        actualCondition = actualCondition && loopCondition;
      }
      if (a.advancedFilterOption == 2) {
        actualCondition = actualCondition || loopCondition;
      }
    });

    return actualCondition;
  }

  filterValues = (row, columnFilter, columnKey) => {
    const value = row[columnKey];
    if (this.state.advancedFilter) {
      if (this.props.column.type === Types.TEXT) {
        return this.validateFiltersText(value.toUpperCase());
      }
    } else {
      if (columnFilter === null) {
        return false;
      }
      if (!isEmptyArray(columnFilter.filterTerm)) {
        return columnFilter.filterTerm.some((filterTerm) => {
          return filterTerm === value;
        });
      }
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

  hasFilter = () => {
    const { advancedFilter, advancedFilters, selected } = this.state;
    return (!advancedFilter && selected.length > 0) ||
      (advancedFilter && advancedFilters.some(x => x.advancedFilterValue));
  }

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

  renderAdvancedFilters = () => {
    const { advancedFilters } = this.state;
    const handleChange = (e, idx) => {
      const filters = this.state.advancedFilters;
      filters[idx][e.target.id] = e.target.value;
      this.setState({ advancedFilters: filters });
    };
    return advancedFilters && advancedFilters.map((a, idx) => {
      const key = idx;
      return (
        <div className="form-inline" key={`filters-${key}`}>
          {idx > 0 &&
            <div className="form-group mx-sm-3 mb-2">
              <select
                value={this.state.advancedFilters[idx].advancedFilterOption}
                onChange={e => handleChange(e, idx)}
                id="advancedFilterOption"
                className="form-control"
              >
                <option value={1}>e</option>
                <option value={2}>ou</option>
              </select>
            </div>
          }
          <div className="form-group mx-sm-3 mb-2">
            <select
              value={this.state.advancedFilters[idx].advancedFilterType}
              onChange={e => handleChange(e, idx)}
              id="advancedFilterType"
              className="form-control"
            >
              <option value={1}>Contem</option>
              <option value={2}>Igual</option>
              <option value={3}>Nao faz nada</option>
            </select>
          </div>
          <div className="form-group mx-sm-3 mb-2">
            <input
              value={this.state.advancedFilters[idx].advancedFilterValue}
              type="text"
              className="form-control"
              id="advancedFilterValue"
              placeholder="Valor"
              onChange={e => handleChange(e, idx)}
            />
          </div>
        </div>
      );
    });
  }

  renderAdvancedFilter = () => {
    const addFilter = () => {
      const virtual = this.state.advancedFilters;
      virtual.push({
        advancedFilterOption: 1,
        advancedFilterType: 1,
        advancedFilterValue: null
      });
      this.setState({ advancedFilters: virtual });
    };

    const removeFilter = () => {
      const virtual = this.state.advancedFilters;
      virtual.pop();
      this.setState({ advancedFilters: virtual });
    };

    const textFilter = () => {
      return (
        <div className="advanced-filter">
          <h3> Filtros coluna {this.props.column.key} </h3>
          {this.renderAdvancedFilters()}
          <div className="advanced-filter-buttons">
            <button
              type="button"
              className="btn btn-primary"
              onClick={addFilter}
            >
              Add
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={removeFilter}
            >
              Remove
            </button>
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
    const { hasFilter } = this.state;
    const className = joinClasses({
      'fa fa-filter': !hasFilter,
      'fa fa-filter-active': hasFilter
    });

    return (
      <Dropdown
        onShowDropdown={this.onOpen}
        onConfirm={this.onConfirm}
      >
        <DropdownToggle className="box-control">
          <span className="icon">
            <i className={className} aria-hidden="true" />
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
