import axios from '../../../axios-orion';
import { loadStart, loadEnd } from '../app';
import updateObject from '../../../utils/updateObject';

export const LIST_AVANCE_ESTAGIOS = 'LIST_AVANCE_ESTAGIOS';
export const CLEAR_AVANCE_ESTAGIOS = 'CLEAR_AVANCE_ESTAGIOS';

const initialState = {
  avance: {
    ordemInfo: null,
    referenciaInfo: null,
    data: []
  }
};

const clearAvanceEstagios = (state) => {
  const newState = updateObject(
    state.avance,
    {
      ordemInfo: initialState.avance.ordemInfo,
      referenciaInfo: initialState.avance.referenciaInfo,
      data: initialState.avance.data
    }
  );
  return updateObject(state, { avance: newState });
};
const listAvanceEstagio = (state, action) => {
  const newState = updateObject(
    state.avance,
    {
      ordemInfo: action.data.first,
      referenciaInfo: action.data.second,
      data: action.data.third
    }
  );
  return updateObject(state, { avance: newState });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_AVANCE_ESTAGIOS: return listAvanceEstagio(state, action);
    case CLEAR_AVANCE_ESTAGIOS: return clearAvanceEstagios(state);
    default: return state;
  }
};

export const limparGridAvance = () => {
  return (dispatch) => {
    return dispatch({
      type: CLEAR_AVANCE_ESTAGIOS
    });
  };
};
export const listarAvanceEstagio = (ordemProducao) => {
  return (dispatch) => {
    loadStart(dispatch);
    axios.get(`/api/ordens/${ordemProducao}/avance`)
      .then((res) => {
        console.log(res.data);
        return dispatch({
          type: LIST_AVANCE_ESTAGIOS,
          data: res.data
        });
      })
      .catch(err => err)
      .finally(() => loadEnd(dispatch));
  };
};

export default reducer;
