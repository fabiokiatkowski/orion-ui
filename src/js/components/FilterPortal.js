import React, { Component } from 'react';
import TetherComponent from 'react-tether';
import PropTypes from 'prop-types';
import { List } from 'react-virtualized';
import { ReactPageClick } from 'react-page-click';

class FilterPortal extends Component {
  static propTypes = {
    onHiddenDropdown: PropTypes.func,
    onShowDropdown: PropTypes.func,
    onConfirm: PropTypes.func,
    data: PropTypes.any.isRequired,
    isUsingOption: PropTypes.func.isRequired,
    toggleOption: PropTypes.func.isRequired
  }

  static defaultProps = {
    onHiddenDropdown: () => {},
    onShowDropdown: () => {},
    onConfirm: null
  }

  state = {
    isOpen: false,
    isAdvanced: false
  };

  close = () => {
    if (this.state.isOpen) {
      this.setState({ isOpen: false });
    }
  }

  confirm = () => {
    this.props.onConfirm();
    this.close();
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

  rowRenderer = (params) => {
    const item = this.props.data.toIndexedSeq().get(params.index);
    const isUsing = this.props.isUsingOption(item);
    return (
      <li key={params.key} style={params.style}>
        <a
          className={isUsing ? 'is-active' : ''}
          onClick={e => this.props.toggleOption(e, isUsing, item)}
        >
          {item.label}
        </a>
      </li>
    );
  }

  renderHeader = () => {
    const { isAdvanced } = this.state;
    return (
      <div className="dropdown-portal-header">
        <div className="dropdown-portal-title">
          <a
            className={!isAdvanced ? 'is-active' : ''}
            onClick={() => this.setState({ isAdvanced: false })}
          >
            Filtros
          </a>
          <span> | </span>
          <a
            className={isAdvanced ? 'is-active' : ''}
            onClick={() => this.setState({ isAdvanced: true })}
          >
            Avançado
          </a>
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
            className="form-control"
            type="text"
            placeholder="Search"
            value=""
            onChange={() => {}}
          />
        </div>
      </div>
    );
  }

  renderToggle = () => {
    return (
      <a
        onClick={e => this.toggle(e)}
        className="dropdown-portal-toggle"
      >
        <span className="icon">
          <i className="fa fa-filter" aria-hidden="true" />
        </span>
      </a>
    );
  }

  renderBody = () => {
    return (
      <List
        className="dropdown-portal-body"
        height={260}
        rowCount={this.props.data.size}
        rowHeight={23}
        rowRenderer={this.rowRenderer}
        width={400}
      />
    );
  }

  render() {
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
        {this.state.isOpen &&
          <ReactPageClick notify={this.close}>
            <div className="dropdown-portal has-header">
              {this.renderHeader()}
              {this.renderSearch()}
              {this.renderBody()}
            </div>
          </ReactPageClick>
        }
      </TetherComponent>
    );
  }
}

export default FilterPortal;
