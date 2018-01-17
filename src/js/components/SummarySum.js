import React, { Component } from 'react';
import Types from '../utils/filterTypes';
import IntegerFormat from '../components/NumeralFormat';

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
    if (this.props.column.type === Types.NUMBER) {
      return (<IntegerFormat
        valor={this.count()}
      />);
    }
    return <div>{this.count()}</div>;
  }
}

export default SummarySum;
