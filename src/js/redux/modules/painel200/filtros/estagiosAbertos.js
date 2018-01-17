import axios from '../../../../axios-orion';

export const LIST = 'estagiosAbertos/LIST';
export const ESTAGIOS_CHECKED = 'estagiosAbertos/ESTAGIOS_CHECKED';
export const ESTAGIOS_DESCHECKED = 'estagiosAbertos/ESTAGIOS_DESCHECKED';

const initalState = {
  data: [],
  estagiosMarcados: []
};

const reducer = (state = initalState, action = {}) => {
  switch (action.type) {
    case LIST: {
      return { ...state, data: action.data };
    }
    case ESTAGIOS_CHECKED: {
      const selectedEstagio = state.estagiosMarcados
        .concat(action.estagioChecked.map(r => r.row.codigoEstagio));
      return { ...state, estagiosMarcados: selectedEstagio };
    }
    case ESTAGIOS_DESCHECKED: {
      const selectedEstagio = state.estagiosMarcados.filter(i =>
        action.estagioDeschecked.indexOf(i) === -1);
      return { ...state, estagiosMarcados: selectedEstagio };
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
      .catch(err => err);
  };
};

export const marcarEstagio = (estagio) => {
  return (dispatch) => {
    dispatch({
      type: ESTAGIOS_CHECKED,
      estagioChecked: estagio
    });
  };
};

export const desmarcarEstagio = (row) => {
  const estagio = row.map(r => r.row.codigoEstagio);
  return (dispatch) => {
    dispatch({
      type: ESTAGIOS_DESCHECKED,
      estagioDeschecked: estagio
    });
  };
};

export default reducer;
