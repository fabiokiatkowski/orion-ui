import React, { Component } from 'react';
import { render } from 'react-dom';
import '../css/style.css';
import logo from '../assets/logotype.png';

export default class Hello extends Component {
  render() {
    return (
      <div>
        Orion XP.
        <img src={ logo } alt='Pacifico Sul' />
      </div>
    );
  }
}

render(<Hello />, document.getElementById('app'));