import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import PanelRepresentantes from '../../src/js/containers/PanelRepresentantes';
import createStore from '../../src/js/store/configureStore';
import Page from '../../src/js/components/Page';
import '../../src/css/style.scss';
import scriptURL from 'sw-loader!./server.js'; // eslint-disable-line
import { createClient } from 'service-mocker/client'; // eslint-disable-line

const client = createClient(scriptURL);

const store = createStore();

const App = () => {
  return (
    <Page title="Painel Representantes">
      <PanelRepresentantes />
    </Page>
  );
};

client.ready.then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app')
  );
});
