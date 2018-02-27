import axios from '../../axios-orion';
import updateObject from '../../utils/updateObject';
import { loadStart, loadEnd } from './app';

export const GET_SUS_DATA = 'suprimento/GET_SUS_DATA';

const initialState = {
  SUSData: []
};

const getSUSDataReducer = (state, action) => {
  updateObject(state, { SUSData: action.data });
};

const reducer = (state = initialState, action) => {
  switch (action.types) {
    case GET_SUS_DATA: return getSUSDataReducer(state, action);
    default: return state;
  }
};

export const getSUSData = (nivel, grupo, subgrupo, item, forn, op, sits) => {
  let queryString = null;
  queryString = nivel ? `nivel=${nivel}` : '';
  if (grupo) {
    queryString = queryString === '' ? `grupo=${grupo}` : `&grupo=${grupo}`;
  }
  if (subgrupo) {
    queryString = queryString === '' ? `subgrupo=${subgrupo}` : `&subgrupo=${subgrupo}`;
  }
  if (item) {
    queryString = queryString === '' ? `item=${item}` : `&item=${item}`;
  }
  if (op) {
    queryString = queryString === '' ? `ordemProducao=${op}` : `&ordemProducao=${op}`;
  }
  if (sits) {
    queryString = queryString === '' ? `situacoes=${sits}` : `&situacoes=${sits}`;
  }
  return (dispatch) => {
    loadStart(dispatch);
    axios.get(`/api/suprimentos/sus/?${queryString}`)
      .then(res => dispatch({
        type: GET_SUS_DATA,
        data: res.data
      }))
      .catch(err => console.log(err))
      .finally(() => loadEnd(dispatch));
  };
};

export default reducer;
