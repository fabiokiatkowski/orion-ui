import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import '../css/style.css';
import UserStages from './containers/UserStages';

const App = (props) => {
  return (
    <div>
      <UserStages />
      Orion  XP.
      <img src={props.logo} alt="Pacifico Sul" />
    </div>
  );
};

App.propTypes = {
  logo: PropTypes.string.isRequired
};

ReactDOM.render(<App logo="../assets/logotype.png" />, document.getElementById('app'));
