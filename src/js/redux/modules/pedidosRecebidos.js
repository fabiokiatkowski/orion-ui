import axios from '../../axios-orion';

export const LIST = 'pedidosRecebidos/LIST';

const initialState = {
  data: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LIST: {
      return { ...state, data: action.data };
    }
    default:
      return state;
  }
}

const getQueryString = (url, periodo, representante, dataInicio, dataFim) => {
  return `${url}?periodo=${periodo}&codRepresentante=${representante}&dataInicioFiltro=${dataInicio}`;
};

export function list(periodo, representante, dataInicio, dataFim) {
  const url = '/api/representantes/mysql/pedidosRecebidos';
  return (dispatch) => {
    axios.get(getQueryString(url, periodo, representante, dataInicio, dataFim))
      .then(res => dispatch({
        type: LIST,
        data: res.data
      }));
  };
}
