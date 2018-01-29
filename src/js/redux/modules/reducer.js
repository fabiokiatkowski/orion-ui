import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import representante from './representante';
import pedidosRecebidos from './pedidosRecebidos';
import image from './image';
import insumoNecessidade from './insumoNecessidade/insumoNecessidade';
import app from './app';
import tela200 from './tela200';
import session from './session';

const rootReducer = combineReducers({
  routing: routerReducer,
  representante,
  pedidosRecebidos,
  tela200,
  app,
  image,
  insumos: insumoNecessidade,
  session
});

export default rootReducer;
