import React, { Component, PropTypes } from 'react';
import debounce from 'lodash/fp/debounce';
import isFunction from 'lodash/fp/isFunction';
import * as arrays from '../utils/arrays';
import { DropdownBody } from './Dropdown';

export default class DropdownSearch extends Component {
  constructor(props) {
    super(props);
    const data = arrays.toImmutableList(props.data).valueSeq();
    this.state = { filterText: '', filteredData: data };
    this.filterData = debounce(100, this.filterData.bind(this, data));
  }

  filter = (paramItem, filterText, keys) => {
    const item = isFunction(paramItem.toJS) ? paramItem.toJS() : paramItem;
    const filtered = keys.filter(key => (`${item[key]}`).toLowerCase().indexOf(filterText.toLowerCase()) >= 0);
    return filtered && filtered.length;
  }

  filterData = (data) => {
    const filterKeys = this.props.filterKeys || ['text'];
    const newData = data.filter(item =>
      this.filter(item, this.state.filterText, filterKeys));
    this.setState({ filteredData: newData });
  }

  handleChange = (evt) => {
    this.setState({ filterText: evt.target.value });
    this.filterData(evt.target.value);
  }

  render() {
    const placeholder = this.props.placeholder || 'Search';
    const childrens = React.Children.map(this.props.children, (child) => {
      if (child.type === DropdownBody) {
        return React.cloneElement(child, { data: this.state.filteredData });
      }
      return child;
    });
    return (
      <div className="dropdown-portal-search">
        <div className="search-input">
          <input
            className="form-control"
            type="text"
            placeholder={placeholder}
            value={this.state.filterText}
            onChange={this.handleChange}
          />
        </div>
        {childrens}
      </div>
    );
  }
}
