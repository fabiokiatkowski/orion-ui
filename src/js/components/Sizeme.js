import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sizeMe from 'react-sizeme';

class Sizeme extends Component {
  static propTypes = {
    size: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired,
    handleChangeSize: PropTypes.func.isRequired,
    children: PropTypes.any.isRequired
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.size.width !== this.props.size.width ||
        nextProps.size.height !== this.props.size.height) {
      this.handleChangeSize(nextProps);
    }
  }

  handleChangeSize = (props) => {
    const { width, height } = props.size || this.props.size;
    this.props.handleChangeSize(width, height);
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

export default sizeMe({ monitorHeight: true })(Sizeme);
