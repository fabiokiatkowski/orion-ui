import React, { Component } from 'react';

const renderLabel = () => {
  return (
    // eslint-disable-next-line
    <label
      className=" toggle__button"
      data-tg-off="Disponivel por usuarios"
      data-tg-on="Disponivel para todos"
      htmlFor="flip"
      onClick={() => {
        this.toggleFreeForAll(false, false);
      }}
    />
  );
};


export default class FlipCardJSX extends Component {
  constructor() {
    super();
    this.state = {
      isChecked: false
    };
  }

  handleToogle = () => {
    this.setState({ isChecked: !this.state.isChecked });
  }

  render() {
    return (
      <div className="toolbar">
        <div className="toolbar__button">
          <input
            className="toggle toggle-flip__input"
            type="checkbox"
            id="flip"
          />
          {renderLabel()}
        </div>
      </div>
    );
  }
}
