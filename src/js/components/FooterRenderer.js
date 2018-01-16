import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDataGrid from 'react-data-grid';

const { Row } = ReactDataGrid;

export default class FooterRenderer extends Component {
  static propTypes = {
    idx: PropTypes.string.isRequired
  };

  setScrollLeft = (scrollBy) => {
    // if you want freeze columns to work, you need to make sure you implement this as apass through
    this.row.setScrollLeft(scrollBy);
  };

  getRowStyle = () => {
    return {
      color: this.getRowBackground()
    };
  };

  getRowBackground = () => {
    return this.props.idx % 2 ? 'green' : 'blue';
  };

  render() {
    // here we are just changing the style
    // but we could replace this with anything we liked, cards, images, etc
    // usually though it will just be a matter of wrapping a div, and then calling back through to the grid
    return (
      <div style={this.getRowStyle()}>
        <Row
          ref={(node) => {
            this.row = node;
          }}
          {...this.props}
        />
      </div>);
  }
}
