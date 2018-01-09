import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import representante from './representante';
import pedidosRecebidos from './pedidosRecebidos';

const rootReducer = combineReducers({
  routing: routerReducer,
  representante,
  pedidosRecebidos
});

export default rootReducer;
