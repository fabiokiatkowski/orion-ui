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
  const url = 'http://192.168.1.120:8080/orion-server/api/representantes/mysql/pedidosRecebidos';
  return (dispatch) => {
    fetch(getQueryString(url, periodo, representante, dataInicio, dataFim))
      .then(response => response.json())
      .then(data => dispatch({
        type: LIST,
        data
      }));
  };
}
