import axios from '../../axios-orion';
import { loadStart, loadEnd } from './app';
import updateObject from '../../utils/updateObject';

export const ESTAGIOS_LIST = 'estagiosAbertos/LIST';
export const ESTAGIOS_CHECKED = 'estagiosAbertos/ESTAGIOS_CHECKED';
export const ESTAGIOS_DESCHECKED = 'estagiosAbertos/ESTAGIOS_DESCHECKED';
export const PERIODOS_LIST = 'periodos/LIST';
export const PERIODOS_CHECK = 'periodos/CHECK';
export const PERIODOS_DESCHECK = 'periodos/PERIODOS_DESCHECK';
export const ORDENS_LIST = 'resultado/LIST';

const initalState = {
  estagios: {
    data: [],
    marcados: []
  },
  periodos: {
    data: [],
    marcados: []
  },
  ordens: {
    data: []
  }
};

const estagiosList = (state, action) => {
  const updatedEstagios = updateObject(state.estagios, {
    data: action.data,
    marcados: []
  });
  const updatedPeriodos = updateObject(state.periodos, { marcados: [] });
  const updatedOrdens = updateObject(state.ordens, { marcados: [] });
  const updatedState = updateObject(state, {
    estagios: updatedEstagios,
    periodos: updatedPeriodos,
    ordens: updatedOrdens
  });
  return updatedState;
};
const estagiosCheckControl = (state, action) => {
  const estagioControl = (action.estagioAction === 'check')
    ?
    state.estagios.marcados
      .concat(action.estagio.map(r => r.row.codigoEstagio))
    :
    state.estagios.marcados
      .filter(i => action.estagio.indexOf(i) === -1);

  const updatedEstagios = updateObject(state.estagios, {
    marcados: estagioControl
  });
  const updatedPeriodos = updateObject(state.periodos, {
    data: [],
    marcados: []
  });
  const updatedOrdens = updateObject(state.ordens, {
    data: [],
    marcados: []
  });
  const updatedState = updateObject(state, {
    estagios: updatedEstagios,
    periodos: updatedPeriodos,
    ordens: updatedOrdens
  });
  return updatedState;
};
const periodosList = (state, action) => {
  const updatedPeriodos = updateObject(state.periodos, { data: action.data });
  const updatedState = updateObject(state, { periodos: updatedPeriodos });
  return updatedState;
};
const periodosCheckControl = (state, action) => {
  const periodoControl = (action.periodoAction === 'check')
    ?
    state.periodos.marcados.concat(action.periodo.map(r => r.row.codigoPeriodo))
    :
    state.periodos.marcados.filter(i => action.periodo.indexOf(i) === -1);
  const updatedPeriodos = updateObject(state.periodos, {
    marcados: periodoControl
  });
  const updatedOrdens = updateObject(state.ordens, { data: [] });
  const updatedState = updateObject(state, {
    periodos: updatedPeriodos,
    ordens: updatedOrdens
  });
  return updatedState;
};
const ordensList = (state, action) => {
  const updatedOrdens = updateObject(state.ordens, { data: action.data });
  const updatedState = updateObject(state, { ordens: updatedOrdens });
  return updatedState;
};
const reducer = (state = initalState, action = {}) => {
  switch (action.type) {
    case ESTAGIOS_LIST: return estagiosList(state, action);
    case ESTAGIOS_CHECKED: return estagiosCheckControl(state, action);
    case ESTAGIOS_DESCHECKED: return estagiosCheckControl(state, action);
    case PERIODOS_LIST: return periodosList(state, action);
    case PERIODOS_CHECK: return periodosCheckControl(state, action);
    case PERIODOS_DESCHECK: return periodosCheckControl(state, action);
    case ORDENS_LIST: return ordensList(state, action);
    default: return state;
  }
};

// #region Estagios
export const listarEstagio = () => {
  return (dispatch) => {
    loadStart(dispatch);
    axios.get('/api/pendente-aproduzir/estagios-abertos/200')
      .then(res => dispatch({
        type: ESTAGIOS_LIST,
        data: res.data
      }))
      .catch(err => err)
      .finally(() => loadEnd(dispatch));
  };
};
export const marcarEstagio = (estagio) => {
  return (dispatch) => {
    dispatch({
      type: ESTAGIOS_CHECKED,
      estagio,
      estagioAction: 'check'
    });
  };
};

export const desmarcarEstagio = (row) => {
  const estagio = row.map(r => r.row.codigoEstagio);
  return (dispatch) => {
    dispatch({
      type: ESTAGIOS_DESCHECKED,
      estagio,
      estagioAction: 'descheck'
    });
  };
};
// #endregion
// #region Periodos
export const marcarPeriodo = (row) => {
  return (dispatch) => {
    dispatch({
      type: PERIODOS_CHECK,
      periodo: row,
      periodoAction: 'check'
    });
  };
};
export const desmarcarPeriodo = (row) => {
  return (dispatch) => {
    dispatch({
      type: PERIODOS_DESCHECK,
      periodo: row,
      periodoAction: 'descheck'
    });
  };
};
export const listarPeriodos = (estagios) => {
  const queryString = param => `?listaEstagios=${param}`;
  return (dispatch) => {
    loadStart(dispatch);
    axios.get('/api/periodo-producao/teste'.concat(queryString(estagios)))
      .then(res => dispatch({
        type: PERIODOS_LIST,
        data: res.data
      }))
      .finally(() => loadEnd(dispatch));
  };
};
// #endregion
// #region Ordens
export const listarOrdens = (estagios, periodos) => {
  const queryString = param => `?listaEstagios=${param}&listaPeriodos=${periodos}`;
  return (dispatch) => {
    loadStart(dispatch);
    axios.get('/api/ordem-pendente-estagio/periodo-estagio'.concat(queryString(estagios)))
      .then(res => dispatch({
        type: ORDENS_LIST,
        data: res.data
      }))
      .then(() => loadEnd(dispatch));
  };
};
// #endregion
export default reducer;
