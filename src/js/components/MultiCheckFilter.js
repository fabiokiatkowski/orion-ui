import React, { Component } from 'react';
import Dropdown, { DropdownBody, DropdownHeader, DropdownToggle } from '../components/Dropdown';
import DropdownSearch from '../components/DropdownSearch';
import { isEmptyArray } from '../utils/arrays';

export default class MultiCheckFilter extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      options: this.getOptions(),
      selected: [],
      advancedFilter: false
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
    options.sort(this.compareStrings);
    return options;
  }

  compareStrings = (a, b) => {
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

  toogleFilterType = () => {
    this.setState({ advancedFilter: !this.state.advancedFilter });
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
    return <div><h1>Vai dar trampo</h1></div>;
  }

  render() {
    const isAdvanced = this.state.advancedFilter;
    return (
      <Dropdown
        onShowDropdown={this.onOpen}
        onConfirm={this.onConfirm}
        toogleType={this.toogleFilterType}
      >
        <DropdownToggle className="box-control">
          <span className="icon">
            <i className="fa fa-plus" />
          </span>
        </DropdownToggle>
        <DropdownHeader>{isAdvanced ? 'Fitro Avançado' : 'Fitros'}</DropdownHeader>
        {!isAdvanced ?
          this.renderDropdownWithItems() : this.renderAdvancedFilter()}
      </Dropdown>
    );
  }
}
