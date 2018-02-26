import Immutable, { fromJS } from 'immutable';
import axios from '../../axios-orion';

export const LIST_PRODUTOS = 'productImages/LIST_PRODUTOS';
export const LIST_INSUMOS = 'productImages/LIST_INSUMOS';

const initialState = {
  produtos: new Immutable.Map(),
  insumos: new Immutable.Map()
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LIST_PRODUTOS: {
      const map = fromJS(action.data);
      const mergedMap = state.produtos.merge(map);
      return { ...state, produtos: mergedMap };
    }
    case LIST_INSUMOS: {
      const map = fromJS(action.data);
      const mergedMap = state.insumos.merge(map);
      return { ...state, insumos: mergedMap };
    }
    default:
      return state;
  }
}

export function listProductImages(referencia) {
  const url = `/api/images/produto/referencia/${referencia}`;
  return (dispatch) => {
    axios.get(url)
      .then(res => dispatch({
        type: LIST_PRODUTOS,
        data: res.data
      }));
  };
}

export function listInsumoImages(insumo) {
  const url = `/api/images/insumo/${insumo}`;
  return (dispatch) => {
    axios.get(url)
      .then(res => dispatch({
        type: LIST_PRODUTOS,
        data: res.data
      }));
  };
}
