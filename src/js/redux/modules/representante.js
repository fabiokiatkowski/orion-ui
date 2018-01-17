import axios from '../../axios-orion';

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
  const url = '/api/representantes/mysql/totalPedidosRecebidos';
  return (dispatch) => {
    axios.get(getQueryString(url, dateFilter, mostrarPedidoSistema, agrupar))
      .then(res => dispatch({
        type: LIST,
        data: res.data
      }));
  };
}
