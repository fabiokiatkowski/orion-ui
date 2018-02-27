import axios from '../../axios-orion';
import updateObject from '../../utils/updateObject';
import { loadStart, loadEnd } from './app';

export const GET_SUS_DATA = 'suprimento/GET_SUS_DATA';

const initialState = {
  SUSData: []
};

const getSUSDataReducer = (state, action) => {
  return updateObject(state, { SUSData: action.data });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUS_DATA: return getSUSDataReducer(state, action);
    default: return state;
  }
};

export const getSUSData = (nivel, grupo, subgrupo, item, forn, op, sits) => {
  let queryString = null;
  queryString = nivel ? `?nivel=${nivel}` : '';
  if (grupo) {
    queryString = queryString === '' ? `?grupo=${grupo}` : queryString.concat(`&grupo=${grupo}`);
  }
  if (subgrupo) {
    queryString = queryString === '' ? `?subgrupo=${subgrupo}` : queryString.concat(`&subgrupo=${subgrupo}`);
  }
  if (item) {
    queryString = queryString === '' ? `?item=${item}` : queryString.concat(`&item=${item}`);
  }
  if (forn) {
    queryString = queryString === '' ? `?fornecedor=${forn}` : queryString.concat(`&fornecedor=${forn}`);
  }
  if (op) {
    queryString = queryString === '' ? `?ordemProducao=${op}` : queryString.concat(`&ordemProducao=${op}`);
  }
  if (sits.length > 0) {
    queryString = queryString === '' ? `?situacoes=${sits}` : queryString.concat(`&situacoes=${sits}`);
  }
  return (dispatch) => {
    loadStart(dispatch);
    axios.get(`/api/suprimento/sus${queryString}`)
      .then(res => dispatch({
        type: GET_SUS_DATA,
        data: res.data
      }))
      .catch(err => console.log(err))
      .finally(() => loadEnd(dispatch));
  };
};

export default reducer;
