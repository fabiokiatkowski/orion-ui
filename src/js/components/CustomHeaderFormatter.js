import React from 'react';
import PropTypes from 'prop-types';

class CustomHeaderFormatter extends React.Component {
  static propTypes = {
    column: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    getValidFilterValues: PropTypes.func.isRequired
  };

  static defaultProps = {
    column: { key: '' }
  }

  getFilter = () => {
    if (this.props.column.filterRenderer !== undefined) {
      const FilterRenderer = this.props.column.filterRenderer;
      return (<FilterRenderer
        {...this.props}
        onChange={this.props.onChange}
      />);
    }
    return null;
  }

  renderHeader = () => {
    return (
      <div
        onClick={this.onClick}
        style={{ cursor: 'pointer' }}
      >
        <span className="filter-icon">
          {this.getFilter()}
        </span>
        {this.props.column.name}
      </div>
    );
  }

  render() {
    return (
      <div>
        { this.renderHeader() }
      </div>
    );
  }
}

export default CustomHeaderFormatter;
