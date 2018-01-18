import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import representante from './representante';
import pedidosRecebidos from './pedidosRecebidos';
import estagiosAbertos from './painel200/estagiosAbertos';
import periodos200 from './painel200/periodos';

const rootReducer = combineReducers({
  routing: routerReducer,
  representante,
  pedidosRecebidos,
  estagiosAbertos,
  periodos200
});

export default rootReducer;
