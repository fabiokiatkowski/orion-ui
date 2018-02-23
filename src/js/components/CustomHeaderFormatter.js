import React from 'react';
import PropTypes from 'prop-types';
import joinClasses from 'classnames';

const DEFINE_SORT = {
  ASC: 'ASC',
  DESC: 'DESC',
  NONE: 'NONE'
};

class CustomHeaderFormatter extends React.Component {
  static propTypes = {
    column: PropTypes.object,
    onFilterChange: PropTypes.func.isRequired,
    getValidFilterValues: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    sortDirection: PropTypes.oneOf(Object.keys(DEFINE_SORT)),
  };

  static defaultProps = {
    column: { key: '' },
    sortDirection: DEFINE_SORT.NONE,
  }

  state = {
    sortDirection: this.props.sortDirection
  }

  onClick = () => {
    let direction;
    switch (this.state.sortDirection) {
      default:
      case null:
      case undefined:
      case DEFINE_SORT.NONE:
        direction = DEFINE_SORT.ASC;
        break;
      case DEFINE_SORT.ASC:
        direction = DEFINE_SORT.DESC;
        break;
      case DEFINE_SORT.DESC:
        direction = DEFINE_SORT.NONE;
        break;
    }

    this.setState({ sortDirection: direction });

    this.props.onSort(
      this.props.column.key,
      direction
    );
  };

  getSortByText = () => {
    const unicodeKeys = {
      ASC: '9650',
      DESC: '9660'
    };
    return this.state.sortDirection === 'NONE' ? '' : String.fromCharCode(unicodeKeys[this.state.sortDirection]);
  };

  getFilter = () => {
    if (this.props.column.filterRenderer !== undefined) {
      const FilterRenderer = this.props.column.filterRenderer;
      return (<FilterRenderer
        ref={((instance) => { this.FilterRendererRef = instance; })}
        {...this.props}
        onChange={this.props.onFilterChange}
      />);
    }
    return null;
  }

  renderHeader = (className) => {
    return (
      <div
        className={className}
        onClick={this.onClick}
        style={{ cursor: 'pointer' }}
      >
        <span className="filter-icon">{this.getFilter()}</span>
        <span className="pull-right">{this.getSortByText()}</span>
        {this.props.column.name}
      </div>
    );
  }

  render() {
    const className = joinClasses({
      'react-grid-HeaderCell-sortable': true,
      'react-grid-HeaderCell-sortable--ascending': this.props.sortDirection === 'ASC',
      'react-grid-HeaderCell-sortable--descending': this.props.sortDirection === 'DESC'
    });

    return (
      <div>
        { this.renderHeader(className) }
      </div>
    );
  }
}

export default CustomHeaderFormatter;
