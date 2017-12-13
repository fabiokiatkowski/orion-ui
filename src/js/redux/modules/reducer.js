import { combineReducers } from 'redux';
import representante from './representante';
import pedidosRecebidos from './pedidosRecebidos';

const rootReducer = combineReducers({
  representante,
  pedidosRecebidos
});

export default rootReducer;
