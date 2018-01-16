import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FlipCard extends Component {
  static propTypes = {
    dataOff: PropTypes.string.isRequired,
    dataOn: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    handleToggle: PropTypes.func.isRequired,
    checked: PropTypes.bool.isRequired
  }

  renderLabel = () => {
    return (
      // eslint-disable-next-line
      <label
        className="toggle__button"
        data-tg-off={this.props.dataOff}
        data-tg-on={this.props.dataOn}
        htmlFor={this.props.id}
        onClick={() => {
          this.props.handleToggle();
        }}
      />
    );
  };

  render() {
    return (
      <div className="toolbar">
        <div className="toolbar__button">
          <input
            className="toggle toggle-flip__input"
            type="checkbox"
            id={this.props.id}
            checked={this.props.checked}
          />
          {this.renderLabel()}
        </div>
      </div>
    );
  }
}

export default FlipCard;
