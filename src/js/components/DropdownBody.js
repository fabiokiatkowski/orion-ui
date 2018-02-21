import React, { PureComponent } from 'react';
import { AutoSizer, List } from 'react-virtualized';
import isFunction from 'lodash/fp/isFunction';
import PropTypes from 'prop-types';
import * as arrays from '../../js/utils/arrays';

export default class DropdownBody extends PureComponent {
  static propTypes = {
    renderItem: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    children: PropTypes.element
  }

  static defaultProps = {
    children: null
  }

  state = {
    data: arrays.toImmutableList(this.props.data).valueSeq(),
    listHeight: 240,
    listRowHeight: 50,
    overscanRowCount: 10,
    scrollToIndex: undefined,
  };

  componentDidMount() {
    console.log('teste');
  }

  rowRenderer = ({
    index
  }) => {
    const item = this.state.data.get(index);
    const isUsing = this.props.isUsingOption(item);
    return (
      <div key={index}>
        <a
          className={isUsing ? 'is-active' : ''}
          onClick={e => this.props.toggleOption(e, isUsing, item)}
        >
          {item.label}
        </a>
      </div>
    );
  }

  renderItem = (paramItem, idx) => {
    const item = isFunction(paramItem.toJS) ? paramItem.toJS() : paramItem;
    const render = this.props.renderItem;
    return (
      <li key={idx}>{render(item, idx)}</li>
    );
  };

  render() {
    return (
      <div className="dropdown-portal-body">
        {this.state.data &&
          <AutoSizer disableHeight>
            {({ width }) => (
              <List
                ref={(instance) => { this.List = instance; }}
                height={this.state.listHeight}
                overscanRowCount={this.state.overscanRowCount}
                rowCount={this.state.data.size}
                rowHeight={this.state.listRowHeight}
                rowRenderer={this.rowRenderer}
                scrollToIndex={this.state.scrollToIndex}
                width={width}
              />
            )}
          </AutoSizer>
        }
        {this.props.children}
      </div>
    );
  }
}
