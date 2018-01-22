import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store/configureStore';
import '../css/style.scss';
import MainLayout from './MainLayout';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MainLayout />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);
