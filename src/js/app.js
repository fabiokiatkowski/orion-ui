import React, { Component } from 'react';
import { render } from 'react-dom';
import '../css/style.css';
import logo from '../assets/logotype.png';
import UserStages from './containers/UserStages.js';

export default class App extends Component {
  render() {
    return (
      <div>
        <UserStages />
        
        Orion  XP.
        <img src={ logo } alt='Pacifico Sul' />
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));