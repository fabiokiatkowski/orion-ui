import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import '../../node_modules/ag-grid/dist/styles/ag-grid.css';
import '../../node_modules/ag-grid/dist/styles/ag-theme-bootstrap.css';
import '../../node_modules/ag-grid/dist/styles/compiled-icons.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
// import UserStages from './containers/UserStages';
import GridBeta from './containers/GridBeta';
import CustomGridBeta from './containers/CustomGridBeta';
import AgGridXp from './containers/AgGridXP';
import createStore from './store/configureStore';

const store = createStore();

const App = () => {
  return (
    <div>
      <CustomGridBeta />
      <div style={{ height: '40px' }} />
      <GridBeta />
      <AgGridXp />
    </div>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);

