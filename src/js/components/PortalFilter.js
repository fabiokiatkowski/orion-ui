import React, { Component } from 'react';
import TetherComponent from 'react-tether';
import PropTypes from 'prop-types';
// import VirtualList from 'react-virtual-list';
import { List } from 'react-virtualized';

const FilterBody = (props) => {
  const rowRenderer = ({
    index, key, style
  }) => {
    console.log(props.items);
    const item = props.items.get(index);
    console.log(item);
    // const isUsing = props.isUsingOption(item);
    return (
      <li key={key} style={style}>
        <a>
          {item.label}
        </a>
      </li>
    );
  };

  return (
    <List
      className="filter-portal-list dropdown-portal-body"
      height={260}
      rowCount={props.items.size}
      rowHeight={23}
      rowRenderer={rowRenderer}
      width={400}
    />
  );
};

class PortalFilter extends Component {
  static propTypes = {
    onHiddenDropdown: PropTypes.func,
    onShowDropdown: PropTypes.func,
    onConfirm: PropTypes.func,
    data: PropTypes.any.isRequired
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

  componentDidMount() {
    console.log("filter");
  }

  toggle = (e) => {
    console.log(e);
    if (e) e.stopPropagation();
    this.setState({ isOpen: !this.state.isOpen });
    if (this.state.isOpen) {
      this.props.onHiddenDropdown();
    } else {
      this.props.onShowDropdown();
    }
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
            onClick={() => {}}
          >
            Aplicar
          </button>
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => {}}
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
        onClick={(e) => {
          console.log(e);
          this.toggle(e);
        }}
        className="dropdown-portal-toggle"
      >
        <span className="icon">
          <i className="fa fa-filter" aria-hidden="true" />
        </span>
      </a>
    );
  }

  render() {
    // console.log(this.props.data.toArray());
    // console.log(this.refs.container);
    // console.log(this.container);
    // let Body = VirtualList()(FilterBody);
    // if (this.container) {
    //   const options = { container: this.container };
    //   Body = VirtualList(options)(FilterBody);
    // }

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
          <div className="dropdown-portal has-header">
            {this.renderHeader()}
            {this.renderSearch()}
            <FilterBody
              renderItem={this.props.renderItem}
              items={this.props.data.toIndexedSeq()}
              itemHeight={23}
            />
          </div>
        }
      </TetherComponent>
    );
  }
}

export default PortalFilter;
