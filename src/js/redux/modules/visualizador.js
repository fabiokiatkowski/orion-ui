import axios from '../../axios-orion';
import { loadStart, loadEnd } from './app';

const LOCALIZADOR_LIST = 'visualizador/LOCALIZADOR_LIST';
const GET_DESC = 'visualizador/GET_DESC';
const CLEAN = 'visualizador/CLEAN';

const initalState = {
  produtosLocalizador: [],
  descricaoProduto: ''
};

const reducer = (state = initalState, action = {}) => {
  switch (action.type) {
    case LOCALIZADOR_LIST: {
      return { ...state, produtosLocalizador: action.data };
    }
    case GET_DESC: {
      return { ...state, descricaoProduto: action.data };
    }
    case CLEAN: {
      return initalState;
    }
    default: return state;
  }
};

export const clean = () => {
  return (dispatch) => {
    dispatch({ type: CLEAN });
  };
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

export const getDescPeca = (referencia) => {
  return (dispatch) => {
    const url = `/api/produto/${referencia}/texto`;
    loadStart(dispatch);
    axios.get(url)
      .then((res) => {
        dispatch({
          type: GET_DESC,
          data: res.data
        });
      })
      .finally(() => {
        loadEnd(dispatch);
      });
  };
};

export const getDescProduto = (nivel, grupo, sub, item) => {
  return (dispatch) => {
    const url = `/api/produto/${nivel}/${grupo}/${sub}/${item}/texto`;
    loadStart(dispatch);
    axios.get(url)
      .then((res) => {
        dispatch({
          type: GET_DESC,
          data: res.data
        });
      })
      .finally(() => {
        loadEnd(dispatch);
      });
  };
};

export const getOndeUsa = () => {
  return (dispatch) => {
    const url = '/api/ondeUsa/';
    loadStart(dispatch);
    axios.get(url)
      .then((res) => {
        console.log(res.data);
      })
      .finally(() => {
        loadEnd(dispatch);
      });
  };
};

export default reducer;
