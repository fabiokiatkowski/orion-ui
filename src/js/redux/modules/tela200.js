import axios from '../../axios-orion';
import { loadStart, loadEnd } from './app';

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

const reducer = (state = initalState, action = {}) => {
  switch (action.type) {
    case ESTAGIOS_LIST: {
      return {
        ...state,
        estagios: {
          ...state.estagios,
          data: action.data
        }
      };
    }
    case ESTAGIOS_CHECKED: {
      const selectedEstagio = state.estagios.marcados
        .concat(action.estagioChecked.map(r => r.row.codigoEstagio));
      return {
        ...state,
        estagios: {
          ...state.estagios,
          marcados: selectedEstagio
        },
        periodos: {
          ...state.periodos,
          data: [],
          marcados: []
        },
        ordens: {
          ...state.ordens,
          data: []
        }
      };
    }
    case ESTAGIOS_DESCHECKED: {
      const selectedEstagio = state.estagios.marcados.filter(i =>
        action.estagioDeschecked.indexOf(i) === -1);
      return {
        ...state,
        estagios: {
          ...state.estagios,
          marcados: selectedEstagio
        },
        periodos: {
          ...state.periodos,
          data: [],
          marcados: []
        },
        ordens: {
          ...state.ordens,
          data: []
        }
      };
    }
    case PERIODOS_LIST: {
      return {
        ...state,
        periodos: {
          ...state.periodos,
          data: action.data
        }
      };
    }
    case PERIODOS_CHECK: {
      const selectedPeriodos = state.periodos.marcados
        .concat(action.periodoChecked.map(r => r.row.codigoPeriodo));
      return {
        ...state,
        periodos: {
          ...state.periodos,
          marcados: selectedPeriodos
        },
        ordens: {
          ...state.ordens,
          data: []
        }
      };
    }
    case PERIODOS_DESCHECK: {
      const selectedPeriodos = state.periodos.marcados.filter(i =>
        action.periodoChecked.indexOf(i) === -1);
      return {
        ...state,
        periodos: {
          ...state.periodos,
          marcados: selectedPeriodos
        },
        ordens: {
          ...state.ordens,
          data: []
        }
      };
    }
    case ORDENS_LIST: {
      return {
        ...state,
        ordens: {
          ...state.ordens,
          data: action.data
        }
      };
    }
    default:
      return state;
  }
};

//#region Estagios
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
      estagioChecked: estagio
    });
  };
};

export const desmarcarEstagio = (row) => {
  const estagio = row.map(r => r.row.codigoEstagio);
  return (dispatch) => {
    dispatch({
      type: ESTAGIOS_DESCHECKED,
      estagioDeschecked: estagio
    });
  };
};
//#endregion
//#region Periodos
export const marcarPeriodo = (row) => {
  return (dispatch) => {
    dispatch({
      type: PERIODOS_CHECK,
      periodoChecked: row
    });
  };
};
export const desmarcarPeriodo = (row) => {
  return (dispatch) => {
    dispatch({
      type: PERIODOS_DESCHECK,
      periodoChecked: row
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
//#endregion
//#region Ordens
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
//#endregion
export default reducer;
