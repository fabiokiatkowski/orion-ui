export const LIST = 'representante/LIST';

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

const getQueryString = (url, dateFilter, mostrarPedidoSistema, agrupar) => {
  return `${url}?dataFiltro=${dateFilter}&mostrarPedidos=${mostrarPedidoSistema}&agrupar=${agrupar}`;
};

export function listByDate(dateFilter, mostrarPedidoSistema, agrupar) {
  const url = 'http://192.168.1.120:8080/orion-server/api/representantes/mysql/totalPedidosRecebidos';
  return (dispatch) => {
    fetch(getQueryString(url, dateFilter, mostrarPedidoSistema, agrupar))
      .then(response => response.json())
      .then(data => dispatch({
        type: LIST,
        data
      }));
  };
}
