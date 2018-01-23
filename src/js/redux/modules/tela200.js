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
  const updatedPeriodos = updateObject(state.periodos, {
    data: [],
    marcados: []
  });
  const updatedOrdens = updateObject(state.ordens, { data: [], marcados: [] });
  const updatedState = updateObject(state, {
    estagios: updatedEstagios,
    periodos: updatedPeriodos,
    ordens: updatedOrdens
  });
  return updatedState;
};
const estagiosCheck = (state, action) => {
  const clearedEstagioState = updateObject(
    initalState,
    { estagios: state.estagios }
  );
  clearedEstagioState.estagios.marcados = state.estagios.marcados
    .concat(action.estagio.map(r => r.row.codigoEstagio));
  return clearedEstagioState;
};
const estagiosDescheck = (state, action) => {
  const clearedEstagioState = updateObject(
    initalState,
    { estagios: state.estagios }
  );
  clearedEstagioState.estagios.marcados = state.estagios.marcados
    .filter(i => action.estagio.indexOf(i) === -1);
  return clearedEstagioState;
};
const periodosList = (state, action) => {
  const updatedPeriodos = updateObject(state.periodos, { data: action.data });
  const updatedState = updateObject(state, { periodos: updatedPeriodos });
  return updatedState;
};
const periodosCheck = (state, action) => {
  const updatedObject = updateObject(
    initalState,
    {
      estagios: state.estagios,
      periodos: state.periodos
    }
  );
  updatedObject.periodos.marcados = state.periodos.marcados
    .concat(action.periodo.map(r => r.row.codigoPeriodo));
  return updatedObject;
};
const periodosDescheck = (state, action) => {
  const updatedObject = updateObject(
    initalState,
    {
      estagios: state.estagios,
      periodos: state.periodos
    }
  );
  updatedObject.periodos.marcados = state.periodos.marcados
    .filter(i => action.periodo.indexOf(i) === -1);
  return updatedObject;
};
const ordensList = (state, action) => {
  const updatedOrdens = updateObject(state.ordens, { data: action.data });
  const updatedState = updateObject(state, { ordens: updatedOrdens });
  return updatedState;
};
const reducer = (state = initalState, action = {}) => {
  switch (action.type) {
    case ESTAGIOS_LIST: return estagiosList(state, action);
    case ESTAGIOS_CHECKED: return estagiosCheck(state, action);
    case ESTAGIOS_DESCHECKED: return estagiosDescheck(state, action);
    case PERIODOS_LIST: return periodosList(state, action);
    case PERIODOS_CHECK: return periodosCheck(state, action);
    case PERIODOS_DESCHECK: return periodosDescheck(state, action);
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
  const periodo = row.map(r => r.row.codigoPeriodo);
  return (dispatch) => {
    dispatch({
      type: PERIODOS_DESCHECK,
      periodo,
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
