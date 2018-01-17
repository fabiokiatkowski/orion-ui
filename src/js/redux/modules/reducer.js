import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import representante from './representante';
import pedidosRecebidos from './pedidosRecebidos';
import filtrosEstagiosAbertos from './painel200/filtros/estagiosAbertos';

const rootReducer = combineReducers({
  routing: routerReducer,
  representante,
  pedidosRecebidos,
  filtrosEstagiosAbertos
});

export default rootReducer;
