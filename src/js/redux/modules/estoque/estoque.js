import axios from '../../../axios-orion';
import { loadStart, loadEnd } from '../app';
import updateObject from '../../../utils/updateObject';

export const LIST_ESTOQUE_REFERENCIA = 'LIST_ESTOQUE_REFERENCIA';
export const LIST_ROLOS_EMPENHADOS = 'LIST_ROLOS_EMPENHADOS';

const initialState = {
  data: [],
  rolosEmpenhados: []
};

const listEstoqueReferencia = (state, action) => {
  return updateObject(state, { data: action.data });
};
const listRolosEmpenhados = (state, action) => {
  return updateObject(state, { rolosEmpenhados: action.data });
};

const reduce = (state = initialState, action) => {
  switch (action.type) {
    case LIST_ESTOQUE_REFERENCIA: return listEstoqueReferencia(state, action);
    case LIST_ROLOS_EMPENHADOS: return listRolosEmpenhados(state, action);
    default: return state;
  }
};

export const listarEstoqueReferencia = (referencia, consideraPlanejamento) => {
  const queryString = ref => `?nivel=${ref.nivel}&grupo=${ref.grupo}&subgrupo=${ref.subgrupo}&item=${ref.item}`;
  return (dispatch) => {
    loadStart(dispatch);
    axios.get(`/api/estoque/referencia/considera-tmrp/${consideraPlanejamento}${queryString(referencia)}`)
      .then(res => dispatch({
        type: LIST_ESTOQUE_REFERENCIA,
        data: {
          referencia,
          depositos: res.data
        }
      }))
      .catch(err => err)
      .finally(() => loadEnd(dispatch));
  };
};

export const listarRolosEmpenhados = (referencia, deposito) => {
  const queryString = (ref, dep) => `?nivel=${ref.nivel}&grupo=${ref.grupo}&subgrupo=${ref.subgrupo}&item=${ref.item}&deposito=${dep}`;
  return (dispatch) => {
    loadStart(dispatch);
    axios.get(`/api/planejamento/produto/rolos-empenhados/${queryString(referencia, deposito)}`)
      .then(res => dispatch({
        type: LIST_ROLOS_EMPENHADOS,
        data: res.data
      }))
      .catch(err => err)
      .finally(() => loadEnd(dispatch));
  };
};

export default reduce;
