import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

class IntegerFormat extends Component {
  state = {
    for: 'bar'
  }
  render() {
    return (
      <div>
        <NumberFormat
          displayType="text"
          thousandSeparator="."
          decimalSeparator=","
          value={this.props.value}
        />
      </div>
    );
  }
}

export default IntegerFormat;
