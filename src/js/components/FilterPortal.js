import React, { Component } from 'react';
import TetherComponent from 'react-tether';
import PropTypes from 'prop-types';
import { List } from 'react-virtualized';
import { ReactPageClick } from 'react-page-click';
import debounce from 'lodash/fp/debounce';
import joinClasses from 'classnames';

const FilterBody = (props) => {
  const { isUsingOption, toggleOption } = props;

  const rowRenderer = (params) => {
    const item = props.items.get(params.index);
    const isUsing = isUsingOption(item);
    return (
      <li key={params.key} style={params.style}>
        <a
          className={isUsing ? 'is-active' : ''}
          onClick={e => toggleOption(e, isUsing, item)}
        >
          {item.label}
        </a>
      </li>
    );
  };

  return (
    <List
      className="dropdown-portal-body"
      height={260}
      rowCount={props.items.size}
      rowHeight={23}
      rowRenderer={rowRenderer}
      width={400}
    />
  );
};

FilterBody.propTypes = {
  items: PropTypes.any.isRequired,
  isUsingOption: PropTypes.func,
  toggleOption: PropTypes.func
};

FilterBody.defaultProps = {
  isUsingOption: () => {},
  toggleOption: () => {}
};

class FilterPortal extends Component {
  static propTypes = {
    onHiddenDropdown: PropTypes.func,
    onShowDropdown: PropTypes.func,
    onConfirm: PropTypes.func,
    data: PropTypes.any.isRequired,
    isUsingOption: PropTypes.func.isRequired,
    toggleOption: PropTypes.func.isRequired,
    filterKeys: PropTypes.array.isRequired,
    hasFilter: PropTypes.bool,
    renderHeaderTitle: PropTypes.element,
    renderAdvancedFilter: PropTypes.element,
    isAdvanced: PropTypes.bool
  }

  static defaultProps = {
    onHiddenDropdown: () => {},
    onShowDropdown: () => {},
    onConfirm: null,
    hasFilter: false,
    renderHeaderTitle: (<div />),
    renderAdvancedFilter: (<div />),
    isAdvanced: false
  }

  constructor(props) {
    super(props);
    this.filterData = debounce(
      100,
      this.filterData.bind(this)
    );
  }

  state = {
    isOpen: false,
    data: this.props.data.toIndexedSeq(),
    filteredData: null,
    filterText: ''
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.setState({ data: nextProps.data.toIndexedSeq() });
    }
  }

  close = () => {
    if (this.state.isOpen) {
      this.setState({
        isOpen: false,
        filteredData: null,
        filterText: ''
      });
    }
  }

  confirm = () => {
    this.props.onConfirm();
    this.close();
  }

  filter = (item, filterText, keys) => {
    const filtered = keys.filter(key => (`${item[key]}`).toLowerCase().indexOf(filterText.toLowerCase()) >= 0);
    return filtered && filtered.length;
  }

  filterData = () => {
    const { filterKeys } = this.props;
    const { data } = this.props;
    const newData = data.filter(item =>
      this.filter(item, this.state.filterText, filterKeys));
    this.setState({ filteredData: newData.toIndexedSeq() });
  }

  handleSearchChange = (evt) => {
    this.setState({ filterText: evt.target.value });
    this.filterData(evt.target.value);
  }

  toggle = (e) => {
    if (e) e.stopPropagation();
    this.setState({ isOpen: !this.state.isOpen });
    if (this.state.isOpen) {
      this.props.onHiddenDropdown();
    } else {
      this.props.onShowDropdown();
    }
  }

  renderHeader = () => {
    return (
      <div className="dropdown-portal-header">
        <div className="dropdown-portal-title">
          {this.props.renderHeaderTitle()}
        </div>
        <div className="dropdown-portal-buttons">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={this.confirm}
          >
            Aplicar
          </button>
          <button
            type="button"
            className="btn btn-sm"
            onClick={this.close}
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  renderSearch = () => {
    return (
      <div className="dropdown-portal-search">
        <div className="search-input">
          <input
            id="filter-text"
            name="filter-text"
            className="form-control"
            type="text"
            placeholder="Search"
            value={this.state.filterText}
            onChange={this.handleSearchChange}
          />
        </div>
      </div>
    );
  }

  renderToggle = () => {
    const className = joinClasses({
      'fa fa-filter': !this.props.hasFilter,
      'fa fa-filter-active': this.props.hasFilter
    });

    return (
      <a
        onClick={e => this.toggle(e)}
        className="dropdown-portal-toggle"
      >
        <span className="icon">
          <i className={className} aria-hidden="true" />
        </span>
      </a>
    );
  }

  renderBodyWithItems = () => {
    const { filteredData, data } = this.state;
    return (
      <FilterBody
        items={filteredData || data}
        isUsingOption={this.props.isUsingOption}
        toggleOption={this.props.toggleOption}
      />
    );
  }

  render() {
    const { isOpen } = this.state;
    const { isAdvanced } = this.props;
    return (
      <TetherComponent
        attachment="top right"
        targetAttachment="bottom left"
        constraints={
          [{
            to: 'window',
            attachment: 'together'
          }]
        }
      >
        {this.renderToggle()}
        {isOpen &&
          <ReactPageClick notify={this.close}>
            <div className="dropdown-portal has-header">
              {this.renderHeader()},
              {!isAdvanced && this.renderSearch()}
              {!isAdvanced ?
                this.renderBodyWithItems() :
                this.props.renderAdvancedFilter()
              }
            </div>
          </ReactPageClick>
        }
      </TetherComponent>
    );
  }
}

export default FilterPortal;
