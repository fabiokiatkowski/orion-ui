import React, { Component } from 'react';
import Dropdown, { DropdownBody, DropdownHeader, DropdownToggle } from '../components/Dropdown';
import DropdownSearch from '../components/DropdownSearch';
import { isEmptyArray } from '../utils/arrays';

export default class MultiCheckFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: this.getOptions(),
      selected: []
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({ options: this.getOptions(newProps) });
  }

  onOpen = () => {
    console.log(this);
    this.setState({ options: this.getOptions() });
  }

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
    return options;
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

  render() {
    const addOption = (e, item) => {
      const newSelected = [...this.state.selected, item.value];
      this.setState({ selected: newSelected });
      this.props.onChange({
        filterTerm: newSelected,
        column: this.props.column,
        rawValue: newSelected,
        filterValues: this.filterValues
      });
    };

    const removeOption = (e, item) => {
      const newSelected = this.state.selected.filter(x => x !== item.value);
      this.setState({ selected: newSelected });
      this.props.onChange({
        filterTerm: newSelected,
        column: this.props.column,
        rawValue: newSelected,
        filterValues: this.filterValues
      });
    };

    const isUsingOption = (item) => {
      return this.state.selected.some(s => s === item.value);
    };

    const toggleOption = (e, isUsing, item) => {
      if (isUsing) {
        removeOption(e, item);
      } else {
        addOption(e, item);
      }
    };

    const renderDropdownItem = (item) => {
      const isUsing = isUsingOption(item);
      return (
        <a
          className={isUsing ? 'is-active' : ''}
          onClick={e => toggleOption(e, isUsing, item)}
        >
          {item.label}
        </a>
      );
    };

    return (
      <Dropdown
        onShowDropdown={this.onOpen}
      >
        <DropdownToggle className="box-control">
          <span className="icon">
            <i className="fa fa-plus" />
          </span>
        </DropdownToggle>
        <DropdownHeader>Fitros</DropdownHeader>
        <DropdownSearch
          placeholder="Pesquisar"
          filterKeys={['value']}
          data={this.state.options}
        >
          <DropdownBody renderItem={renderDropdownItem} />
        </DropdownSearch>
      </Dropdown>
    );
  }
}
