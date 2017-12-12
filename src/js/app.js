import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import PanelRepresentantes from './containers/representante/PanelRepresentantes';
import createStore from './store/configureStore';
import '../css/style.scss';

const store = createStore();

const App = () => {
  return (
    <div>
      <PanelRepresentantes />
    </div>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
