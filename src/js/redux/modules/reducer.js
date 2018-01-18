import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import representante from './representante';
import pedidosRecebidos from './pedidosRecebidos';

import app from './app';
import tela200 from './tela200';

const rootReducer = combineReducers({
  routing: routerReducer,
  representante,
  pedidosRecebidos,
  tela200,
  app
});

export default rootReducer;
