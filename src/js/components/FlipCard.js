import React, { Component } from 'react';

class FlipCard extends Component {
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
