import React, { Component } from 'react';
import joinClasses from 'classnames';
import { Set } from 'immutable';
// import Dropdown, { DropdownBody, DropdownHeader, DropdownToggle } from '../components/Dropdown';
// import Dropdown, { DropdownHeader, DropdownToggle } from '../components/Dropdown';
// import DropdownBody from '../components/DropdownBody';
// import DropdownBody from '../components/Ddb';
import Dropdown from '../components/FilterPortal';
import DropdownSearch from '../components/DropdownSearch';
import { isEmptyArray } from '../utils/arrays';
import Types from '../utils/filterTypes';
import { TextOptions, NumberOptions } from '../utils/filterOptions';

export default class SuperFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: new Set(),
      selected: [],
      advancedFilter: false,
      advancedFilters: [
        {
          advancedFilterOption: 'AND',
          advancedFilterType: 'EQUAL',
          advancedFilterValue: null
        }
      ],
      hasFilter: false
    };
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
      return { value: null, label: '' };
    });
    let result = options.add({ value: '__selectall__', label: 'SELECIONAR TODOS' });
    if (props.column.type === Types.NUMBER) {
      result = result.sort(this.compareNumber);
    } else {
      result = result.sort(this.compareText);
    }
    return result;
  }

  getFilterOptions = () => {
    const options = [];
    if (this.props.column.type === Types.NUMBER) {
      NumberOptions.forEach((v, k) => {
        options.push(<option key={v} value={k}>{v}</option>);
      });
    } else if (this.props.column.type === Types.TEXT) {
      TextOptions.forEach((v, k) => {
        options.push(<option key={v} value={k}>{v}</option>);
      });
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

      if (loopValue) {
        switch (a.advancedFilterType) {
          case 'CONTAINS': {
            loopCondition = value.includes(loopValue.toUpperCase());
            break;
          }
          case 'EQUAL': {
            const stringA = String(value).trim();
            const stringB = String(loopValue.toUpperCase()).trim();
            loopCondition = (stringA === stringB);
            break;
          }
          case 'NOT_CONTAINS': {
            loopCondition = !value.includes(loopValue.toUpperCase());
            break;
          }
          case 'NOT_EQUAL': {
            const stringA = String(value).trim();
            const stringB = String(loopValue.toUpperCase()).trim();
            loopCondition = (stringA !== stringB);
            break;
          }
          default:
            break;
        }
      }

      if (a.advancedFilterOption === 'AND') {
        actualCondition = actualCondition && loopCondition;
      }
      if (a.advancedFilterOption === 'OR') {
        actualCondition = actualCondition || loopCondition;
      }
    });

    return actualCondition;
  }

  validateFiltersNumber = (value) => {
    let actualCondition = true;
    this.state.advancedFilters.forEach((a) => {
      const loopValue = a.advancedFilterValue;
      let loopCondition = true;

      if (loopValue) {
        switch (a.advancedFilterType) {
          case 'EQUAL': {
            loopCondition = value === loopValue;
            break;
          }
          case 'NOT_EQUAL': {
            loopCondition = value !== loopValue;
            break;
          }
          case 'GREATER_THAN': {
            loopCondition = value > loopValue;
            break;
          }
          case 'EQUAL_GREATER_THAN': {
            loopCondition = value >= loopValue;
            break;
          }
          case 'LESS_THAN': {
            loopCondition = value < loopValue;
            break;
          }
          case 'EQUAL_LESS_THAN': {
            loopCondition = value <= loopValue;
            break;
          }
          default:
            break;
        }
      }

      if (a.advancedFilterOption === 'AND') {
        actualCondition = actualCondition && loopCondition;
      }
      if (a.advancedFilterOption === 'OR') {
        actualCondition = actualCondition || loopCondition;
      }
    });

    return actualCondition;
  }

  filterValues = (row, columnFilter, columnKey) => {
    const value = row.get(columnKey);
    if (this.state.advancedFilter) {
      if (this.props.column.type === Types.TEXT) {
        return this.validateFiltersText(value.toUpperCase());
      }
      if (this.props.column.type === Types.NUMBER) {
        return this.validateFiltersNumber(value);
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
        {/* <DropdownBody
          renderItem={this.renderDropdownItem}
          items={this.state.options}
          itemHeight={100}
        /> */}
        <DropdownBody
          isUsingOption={this.isUsingOption}
          toggleOption={this.toggleOption}
        />
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
    const options = this.getFilterOptions();

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
                <option value="AND">e</option>
                <option value="OR">ou</option>
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
              {options}
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
        advancedFilterOption: 'AND',
        advancedFilterType: 'EQUAL',
        advancedFilterValue: null
      });
      this.setState({ advancedFilters: virtual });
    };

    const removeFilter = () => {
      const virtual = this.state.advancedFilters;
      virtual.pop();
      this.setState({ advancedFilters: virtual });
    };

    return (
      <div className="advanced-filter">
        {this.renderAdvancedFilters()}
        <div className="advanced-filter-buttons">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={addFilter}
          >
            Adiciona
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={removeFilter}
          >
            Apaga
          </button>
        </div>
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

    // return (
    //   <Dropdown
    //     onShowDropdown={this.onOpen}
    //     onConfirm={this.onConfirm}
    //   >
    //     <DropdownToggle className="box-control">
    //       <span className="icon">
    //         <i className={className} aria-hidden="true" />
    //       </span>
    //     </DropdownToggle>
    //     <DropdownHeader>
    //       {this.renderHeaderTitle()}
    //     </DropdownHeader>
    //     {!isAdvanced ?
    //       this.renderDropdownWithItems() : this.renderAdvancedFilter()}
    //   </Dropdown>
    // );

    return (
      <Dropdown
        onShowDropdown={this.onOpen}
        renderItem={this.renderDropdownItem}
        onConfirm={this.onConfirm}
        data={this.state.options}
        isUsingOption={this.isUsingOption}
        toggleOption={this.toggleOption}
      />);
  }
}
