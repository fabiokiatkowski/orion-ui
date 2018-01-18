import React from 'react';
import PropTypes from 'prop-types';
import joinClasses from 'classnames';

const DEFINE_SORT = {
  ASC: 'ASC',
  DESC: 'DESC',
  NONE: 'NONE'
};

const SelectAll = (props) => {
  return (
    <div className="react-grid-checkbox-container checkbox-align">
      <input
        className="react-grid-checkbox"
        type="checkbox"
        name="select-all-checkbox"
        id="select-all-checkbox"
        ref={props.inputRef}
        onChange={props.onChange}
      />
      <label htmlFor="select-all-checkbox" className="react-grid-checkbox-label" />
    </div>
  );
};

SelectAll.propTypes = {
  onChange: PropTypes.func,
  inputRef: PropTypes.func
};

SelectAll.defaultProps = {
  onChange: () => {},
  inputRef: () => {}
};

class CustomHeaderCell extends React.Component {
  static propTypes = {
    column: PropTypes.object,
    onSort: PropTypes.func.isRequired,
    sortDirection: PropTypes.oneOf(Object.keys(DEFINE_SORT)),
    onFilterChange: PropTypes.func
  };

  static defaultProps = {
    column: { key: '' },
    sortDirection: DEFINE_SORT.NONE,
    onFilterChange: () => {}
  }

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
      this.props.column.key,
      direction
    );
  };

  getFilter = () => {
    if (this.props.column.filterRenderer !== undefined) {
      const FilterRenderer = this.props.column.filterRenderer;
      return (<FilterRenderer
        {...this.props}
        onChange={this.props.onFilterChange}
      />);
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

  renderHeader = (className) => {
    if (this.props.column.key === 'select-row') {
      return (
        <SelectAll {...this.props} />
      );
    }
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

export default CustomHeaderCell;
