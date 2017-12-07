import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
// import UserStages from './containers/UserStages';
import GridBeta from './containers/GridBeta';
import CustomGridBeta from './containers/CustomGridBeta';
import GridRepresentante from './containers/GridRepresentante';
import PanelRepresentantes from './containers/PanelRepresentantes';
import AgGridXp from './containers/AgGridXP';
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

