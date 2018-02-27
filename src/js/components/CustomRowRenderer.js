import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-data-grid';

class CustomRowRenderer extends Component {
  static propTypes = {
    idx: PropTypes.string.isRequired,
    activeIdx: PropTypes.string.isRequired
  };

  setScrollLeft = (scrollBy) => {
    this.row.setScrollLeft(scrollBy);
  };

  isActive = () => {
    return this.props.activeIdx === this.props.idx;
  }

  render() {
    return (
      <div className={this.isActive() ? 'row-active' : ''}>
        <Row
          ref={(node) => { this.row = node; }}
          {...this.props}
        />
      </div>
    );
  }
}

export default CustomRowRenderer;
