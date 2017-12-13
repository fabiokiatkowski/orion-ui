import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import PanelRepresentantes from './containers/PanelRepresentantes';
import createStore from './store/configureStore';
import FlipCard from './components/flipcard-exp';
import Page from './components/Page';
import '../css/style.scss';

const store = createStore();

const App = () => {
  return (
    <Page title="Painel Representantes">
      <FlipCard />
      <PanelRepresentantes />
    </Page>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
