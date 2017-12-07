import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import GridRepresentante from './containers/representante/GridRepresentante';
import PanelRepresentantes from './containers/representante/PanelRepresentantes';
import createStore from './store/configureStore';

const store = createStore();

const App = () => {
  return (
    <div>
      <GridRepresentante />
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

