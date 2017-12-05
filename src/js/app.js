import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import '../css/style.css';
import UserStages from './containers/UserStages';
import reducer from './redux/modules/reducer';
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

