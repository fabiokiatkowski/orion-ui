import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import PanelRepresentantes from './containers/representante/PanelRepresentantes';
import createStore from './store/configureStore';
import Page, { PageContent } from './containers/Page';
import '../css/style.scss';

const store = createStore();

const App = () => {
  return (
    <Page title="Painel Representantes" id="activity-index">
      <PageContent>
        <PanelRepresentantes />
      </PageContent>
    </Page>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
