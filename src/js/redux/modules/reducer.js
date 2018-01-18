import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import representante from './representante';
import pedidosRecebidos from './pedidosRecebidos';
import app from './app';
import estagiosAbertos from './painel200/estagiosAbertos';
import periodos200 from './painel200/periodos';

const rootReducer = combineReducers({
  routing: routerReducer,
  representante,
  pedidosRecebidos,
  app,
  estagiosAbertos,
  periodos200
});

export default rootReducer;
