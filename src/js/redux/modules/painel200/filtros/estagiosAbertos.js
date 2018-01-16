import axios from '../../../../axios-orion';

export const LIST = 'estagiosAbertos/LIST';

const initalState = {
  data: []
};

const reducer = (state = initalState, action = {}) => {
  switch (action.type) {
    case LIST: {
      return { ...state, data: action.data };
    }
    default:
      return state;
  }
};

export const listaEstagio = () => {
  return (dispatch) => {
    axios.get('/api/pendente-aproduzir/estagios-abertos/200')
      .then(res => dispatch({
        type: LIST,
        data: res.data
      }))
      .catch(err => console.error(err));
  };
};

export default reducer;
