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
export const MARCAR_UTI = 'tela200/MARCAR_UI';
export const DESMARCAR_UTI = 'tela200/DESMARCAR_UTI';
export const DESMARCAR_TODOS_UTI = 'tela200/DESMARCAR_TODOS_UTI';
export const GRID_CORTE_LIST = 'gridCorte/LIST';
export const LIST_ESTAGIOS_PARALELOS = 'gridCorte/LIST_ESTAGIOS_PARALELOS';
export const LIST_ONDE_TEM = 'gridOndeTem/LIST_ONDE_TEM';
export const LIST_FILHAS = 'gridFilhas/LIST_FILHAS';
export const CLEAN_FILHAS = 'gridFilhas/CLEAN_FILHAS';
export const LIST_LOG_UTI = 'gridLogUti/LIST_LOG_UTI';
export const CANCELAR_ORDEM_PRODUCAO = 'tela200/CANCELAR_ORDEM_PRODUCAO';
export const LIMPAR_CANCELAMENTO = 'tela200/LIMPAR_CANCELAMENTO';

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
  },
  gradeCorte: {
    data: []
  },
  estagiosParalelos: {
    data: []
  },
  ondeTem: {
    data: []
  },
  filhos: {
    data: []
  },
  logUti: {
    data: []
  },
  cancelar: {
    hasErrors: false,
    messages: []
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
    .concat(action.estagio.map(r =>
      r.row.codigoEstagio || r.row.get('codigoEstagio')));
  return clearedEstagioState;
};
const estagiosDescheck = (state, action) => {
  const clearedEstagioState = updateObject(
    initalState,
    { estagios: state.estagios }
  );
  console.log('teste', action);
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
const marcarUtiReducer = (state, action) => {
  const newOrdens = state.ordens.data.map((ordem) => {
    const newOrdem = ordem;
    if (ordem.ordemProducao === action.op
      && ordem.referenciaPeca === action.referencia) {
      newOrdem.desOpUti = 'SIM';
    }
    return newOrdem;
  });
  const newState = state;
  newState.ordens.data = newOrdens;
  return newState;
};
const desmarcarUtiReducer = (state, action) => {
  const newOrdens = state.ordens.data.map((ordem) => {
    const newOrdem = ordem;
    if (ordem.ordemProducao === action.op) {
      newOrdem.desOpUti = 'NAO';
    }
    return newOrdem;
  });
  const newState = state;
  newState.ordens.data = newOrdens;
  return newState;
};
const desmarcarTodosUtiReducer = (state, action) => {
  const newOrdens = state.ordens.data.map((ordem) => {
    const newOrdem = ordem;
    if (action.desmarcados.some(x => x === ordem.ordemProducao)) {
      newOrdem.desOpUti = 'NAO';
    }
    return newOrdem;
  });
  const newState = state;
  newState.ordens.data = newOrdens;
  return newState;
};
const gridCorteList = (state, action) => {
  const normalizedData = [];
  const titles = Object.keys(action.data[0]);
  normalizedData.push(titles);
  action.data.forEach(i => normalizedData.push(Object.values(i)));
  const updatedGrade = updateObject(state.gradeCorte, { data: normalizedData });
  return updateObject(state, { gradeCorte: updatedGrade });
};
const listEstagiosParalelos = (state, action) => {
  const newState = state;
  newState.estagiosParalelos.data = action.data.data
    .filter(x => x.ordemProducao === action.data.ordem);
  return newState;
};
const listOndeTem = (state, action) => {
  const filteredData = action.data.data
    .filter((x) => {
      return action.data.sameOp ? x.ordemProducao !== action.data.ordem : x;
    })
    .filter((x) => {
      return action.data.sameCor ? x.item === action.data.item : x;
    });
  const updatedData = updateObject(state.ondeTem, { data: filteredData });
  return updateObject(state, { ondeTem: updatedData });
};
const listFilhas = (state, action) => {
  const updatedData = updateObject(state.filhos, { data: action.data });
  return updateObject(state, { filhos: updatedData });
};
const cleanFilhas = (state) => {
  return updateObject(state, { filhos: initalState.filhos });
};
const listLogUti = (state, action) => {
  const updatedData = updateObject(state.logUti, { data: action.data });
  return updateObject(state, { logUti: updatedData });
};
const cancelarOP = (state, action) => {
  const updatedData = updateObject(
    state.cancelar,
    {
      hasErrors: action.data.hasErrors,
      messages: action.data.messages
    }
  );
  return updateObject(state, { cancelar: updatedData });
};
const cleanCancelamento = (state) => {
  const updatedData = updateObject(
    state.cancelar,
    initalState.cancelar
  );
  return updateObject(state, { cancelar: updatedData });
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
    case MARCAR_UTI: return marcarUtiReducer(state, action);
    case DESMARCAR_UTI: return desmarcarUtiReducer(state, action);
    case GRID_CORTE_LIST: return gridCorteList(state, action);
    case LIST_ESTAGIOS_PARALELOS: return listEstagiosParalelos(state, action);
    case LIST_ONDE_TEM: return listOndeTem(state, action);
    case DESMARCAR_TODOS_UTI: return desmarcarTodosUtiReducer(state, action);
    case LIST_FILHAS: return listFilhas(state, action);
    case CLEAN_FILHAS: return cleanFilhas(state);
    case LIST_LOG_UTI: return listLogUti(state, action);
    case CANCELAR_ORDEM_PRODUCAO: return cancelarOP(state, action);
    case LIMPAR_CANCELAMENTO: return cleanCancelamento(state);
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
  const estagio = row.map(r =>
    r.row.codigoEstagio || r.row.get('codigoEstagio'));
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
      .finally(() => loadEnd(dispatch));
  };
};
// #endregion

// #region Painel Grade de Corte
export const listarGradeCorte = (ordemProducao) => {
  const queryString = param => `?ordemProducao=${param}`;
  return (dispatch) => {
    loadStart(dispatch);
    axios.get('/api/ordens/itens'.concat(queryString(ordemProducao)))
      .then(res => dispatch({
        type: GRID_CORTE_LIST,
        data: res.data
      }))
      .catch(err => err)
      .finally(() => loadEnd(dispatch));
  };
};
// #endregion
// #region Painel Estágios Paralelos
export const listarEstagiosParalelos = (ordem, grupo, item) => {
  const url = `/api/ordens/${ordem}/estagios-paralelos?grupo=${grupo}&item=${item}`;
  return (dispatch) => {
    loadStart(dispatch);
    axios.get(url)
      .then(res => dispatch({
        type: LIST_ESTAGIOS_PARALELOS,
        data: {
          data: res.data,
          ordem
        }
      }))
      .finally(() => loadEnd(dispatch));
  };
};
// #endregion
// #region Painel Onde Tem
export const listarOndeTem = (ordem, grupo, item, sameOp, sameCor) => {
  const url = `/api/ordens/${ordem}/estagios-paralelos?grupo=${grupo}`;
  return (dispatch) => {
    loadStart(dispatch);
    axios.get(url)
      .then(res => dispatch({
        type: LIST_ONDE_TEM,
        data: {
          data: res.data,
          ordem,
          item,
          sameOp,
          sameCor
        }
      }))
      .finally(() => loadEnd(dispatch));
  };
};
// #endregion
// #region Painel Filhos
export const listarFilhos = (ordemPrincipal) => {
  const url = `/api/ordens/filhas?ordemPrincipal=${ordemPrincipal}`;
  return (dispatch) => {
    loadStart(dispatch);
    axios.get(url)
      .then(res => dispatch({
        type: LIST_FILHAS,
        data: res.data
      }))
      .finally(() => loadEnd(dispatch));
  };
};
export const limparFilhos = () => dispatch => dispatch({ type: CLEAN_FILHAS });
// #endregion

// #region Ações
export const marcarUti = (op, referencia) => {
  return (dispatch) => {
    loadStart(dispatch);
    axios.post(`/api/prioridadeOp/op/${op}/grupo/${referencia}/marcar`)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: MARCAR_UTI,
            op,
            referencia
          });
        }
      }).catch(() => {
        /* Alerta temporario. */
        /* TODO criar componente de mensagens */
        alert('Essa op ja esta marcada como prioridade');
      }).finally(() => loadEnd(dispatch));
  };
};
export const desmarcarUti = (op) => {
  return (dispatch) => {
    loadStart(dispatch);
    axios.post(`/api/prioridadeOp/op/${op}/desmarcar`)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: DESMARCAR_UTI,
            op
          });
        }
      }).catch(() => {
        /* Alerta temporario. */
        /* TODO criar componente de mensagens */
        alert('Essa op nao esta marcada como prioridade');
      }).finally(() => loadEnd(dispatch));
  };
};
export const desmarcarTodosUti = (ops) => {
  return (dispatch) => {
    const url = '/api/prioridadeOp/desmarcarTodos';
    loadStart(dispatch);
    axios.post(url, ops)
      .then((res) => {
        dispatch({
          type: DESMARCAR_TODOS_UTI,
          desmarcados: res.data
        });
      })
      .finally(() => {
        loadEnd(dispatch);
      });
  };
};
export const listarLogUti = (op) => {
  return (dispatch) => {
    const url = `/api/prioridadeOp/op/${op}/log`;
    loadStart(dispatch);
    axios.get(url)
      .then((res) => {
        dispatch({
          type: LIST_LOG_UTI,
          data: res.data
        });
      })
      .finally(() => {
        loadEnd(dispatch);
      });
  };
};
export const cancelarOrdemProducao = (op, observacao) => {
  return (dispatch) => {
    const url = `/api/ordens/${op}/cancelar`;
    loadStart(dispatch);
    axios.post(url, { observacao })
      .then((res) => {
        dispatch({
          type: CANCELAR_ORDEM_PRODUCAO,
          data: res.data
        });
      })
      .catch((err) => {
        dispatch({
          type: CANCELAR_ORDEM_PRODUCAO,
          data: err.response.data
        });
      })
      .finally(() => loadEnd(dispatch));
  };
};
export const limparCancelamento = () => {
  return (dispatch) => {
    dispatch({
      type: LIMPAR_CANCELAMENTO
    });
  };
};
// #endregion
export default reducer;
