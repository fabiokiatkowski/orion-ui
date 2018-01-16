import React, { Component } from 'react';

class SummarySum extends Component {
  state = { teste: 'teste' }

  count = () => {
    let sum = 0;
    for (let index = 0; index < this.props.rowsCount; index += 1) {
      sum += this.props.rowGetter(index)[this.props.column.key];
    }
    return sum;
  }

  render() {
    return <div>{this.count()}</div>;
  }
}

export default SummarySum;
