import axios from '../../../axios-orion';
import { loadStart, loadEnd } from '../app';
import updateObject from '../../../utils/updateObject';

export const LIST_INSUMO_NECESSIDADE = 'LIST_INSUMO_NECESSIDADE';

const initialState = {
  data: []
};

const listInsumoNecessidade = (state, action) => {
  return updateObject(state, { data: action.data });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_INSUMO_NECESSIDADE: return listInsumoNecessidade(state, action);
    default: return state;
  }
};

export const listarInsumoNecessidade = (ordemProducao) => {
  return (dispatch) => {
    loadStart(dispatch);
    axios.get(`/api/planejamento/insumosNecessidade/?ordemProducao=${ordemProducao}`)
      .then(res => dispatch({
        type: LIST_INSUMO_NECESSIDADE,
        data: res.data
      }))
      .catch(err => err)
      .finally(() => loadEnd(dispatch));
  };
};

export default reducer;
