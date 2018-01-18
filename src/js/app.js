import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store/configureStore';
import Header from './components/Header';
import '../css/style.scss';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Header />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);
