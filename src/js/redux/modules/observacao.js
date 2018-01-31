import axios from '../../axios-orion';
import formatDate from '../../utils/date';

export const LIST = 'observacao/LIST';
export const ADD = 'observacao/ADD';

const initialState = {
  data: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LIST: {
      return { ...state, data: action.data };
    }
    case ADD: {
      const newData = action.data;
      newData.dataObservacao = formatDate(action.data.dataObservacao);
      return { ...state, data: [...state.data, action.data] };
    }
    default:
      return state;
  }
}

export function list(op, todos) {
  const url = `/api/observacao/op/${op}?todos=${todos}`;
  return (dispatch) => {
    axios.get(url)
      .then(res => dispatch({
        type: LIST,
        data: res.data
      }));
  };
}

export function add(op, payload) {
  const url = `/api/observacao/op/${op}/add`;
  return (dispatch) => {
    axios.post(url, payload)
      .then(res => dispatch({
        type: ADD,
        data: res.data
      }));
  };
}
