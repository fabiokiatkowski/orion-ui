import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../css/style.css';
import UserStages from './containers/UserStages';
import createStore from './store/configureStore';

const store = createStore();

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

ReactDOM.render(
  <Provider store={store}>
    <App logo="../assets/logotype.png" />
  </Provider>,
  document.getElementById('app')
);

