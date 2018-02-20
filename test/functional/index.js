import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from '../../src/js/store/configureStore';
import '../../src/css/style.scss';
import MainLayout from '../../src/js/MainLayout';
import scriptURL from 'sw-loader!./server.js'; // eslint-disable-line
import { createClient } from 'service-mocker/client'; // eslint-disable-line

const client = createClient(scriptURL);

client.ready.then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MainLayout />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
  );
});
