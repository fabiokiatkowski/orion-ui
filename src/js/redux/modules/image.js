import Immutable, { fromJS } from 'immutable';
import axios from '../../axios-orion';

export const LIST_PRODUTOS = 'productImages/LIST_PRODUTOS';

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
