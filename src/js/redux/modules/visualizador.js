import axios from '../../axios-orion';
import { loadStart, loadEnd } from './app';

const LOCALIZADOR_LIST = 'visualizador/LOCALIZADOR_LIST';

const initalState = {
  produtosLocalizador: []
};

const reducer = (state = initalState, action = {}) => {
  switch (action.type) {
    case LOCALIZADOR_LIST: {
      return { ...state, produtosLocalizador: action.data };
    }
    default: return state;
  }
};

export const listProdutosLocalizador = (payload) => {
  return (dispatch) => {
    const url = '/api/produto/localizarProdutos';
    loadStart(dispatch);
    /* Usando post porque o axios nao aceita body no get,
       TODO: Refatorar end point para usar query string  */
    axios.post(url, payload)
      .then((res) => {
        dispatch({
          type: LOCALIZADOR_LIST,
          data: res.data
        });
      })
      .finally(() => {
        loadEnd(dispatch);
      });
  };
};

export default reducer;
