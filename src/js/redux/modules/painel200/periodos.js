import axios from '../../../axios-orion';

const LIST = 'periodos/LIST';
const CHECK = 'periodos/CHECK';

const initialState = {
  data: [],
  periodos: []
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case LIST: {
      console.log(action.data);
      return { ...state, data: action.data };
    }
    case CHECK: {
      return state;
    }
    default:
      return state;
  }
};

export const marcarPeriodo = (row) => {
  return (dispatch) => {
    dispatch({
      type: CHECK,
      periodo: row
    });
  };
};

export const listarPeriodos = (estagios) => {
  const queryString = param => `?listaEstagios=${param}`;
  return (dispatch) => {
    axios.get('/api/periodo-producao/teste'.concat(queryString(estagios)))
      .then(res => dispatch({
        type: LIST,
        data: res.data
      }));
  };
};

export default reducer;
