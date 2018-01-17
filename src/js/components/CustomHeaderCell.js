import React from 'react';
import PropTypes from 'prop-types';
import joinClasses from 'classnames';

const DEFINE_SORT = {
  ASC: 'ASC',
  DESC: 'DESC',
  NONE: 'NONE'
};

class CustomHeaderCell extends React.Component {
  static propTypes = {
    columnKey: PropTypes.string.isRequired,
    column: PropTypes.shape({ name: PropTypes.node }),
    onSort: PropTypes.func.isRequired,
    sortDirection: PropTypes.oneOf(Object.keys(DEFINE_SORT))
  };

  onClick = () => {
    let direction;
    switch (this.props.sortDirection) {
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
    this.props.onSort(
      this.props.columnKey,
      direction
    );
  };

  getFilter = () => {
    if (this.props.column.filterRenderer !== undefined) {
      const FilterRenderer = this.props.column.filterRenderer;
      return <FilterRenderer {...this.props} onChange={this.props.onFilterChange} />;
    }
    return null;
  }

  getSortByText = () => {
    const unicodeKeys = {
      ASC: '9650',
      DESC: '9660'
    };
    return this.props.sortDirection === 'NONE' ? '' : String.fromCharCode(unicodeKeys[this.props.sortDirection]);
  };

  render() {
    const className = joinClasses({
      'react-grid-HeaderCell-sortable': true,
      'react-grid-HeaderCell-sortable--ascending': this.props.sortDirection === 'ASC',
      'react-grid-HeaderCell-sortable--descending': this.props.sortDirection === 'DESC'
    });

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
}

export default CustomHeaderCell;
