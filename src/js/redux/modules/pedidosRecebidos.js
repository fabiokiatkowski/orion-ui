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

export function list() {
  return (dispatch) => {
    fetch('http://localhost:8080/api/representantes/mysql/pedidosRecebidos?dataInicioFiltro&#x3D;2017-12-12&amp;codRepresentante&#x3D;114')
      .then(response => response.json())
      .then(data => dispatch({
        type: LIST,
        data
      }));
  };
}