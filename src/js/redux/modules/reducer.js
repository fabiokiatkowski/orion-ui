import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import representante from './representante';
import pedidosRecebidos from './pedidosRecebidos';
import image from './image';
import insumoNecessidade from './insumoNecessidade/insumoNecessidade';
import estoque from './estoque/estoque';
import app from './app';
import tela200 from './tela200';
import session from './session';
import observacao from './observacao';
import visualizador from './visualizador';
import suprimento from './suprimento';

const rootReducer = combineReducers({
  routing: routerReducer,
  representante,
  pedidosRecebidos,
  tela200,
  app,
  image,
  insumos: insumoNecessidade,
  estoque,
  session,
  observacao,
  visualizador,
  suprimento
});

export default rootReducer;
