import axios from '../../axios-orion';
import formatDate from '../../utils/date';

export const CLEAR_LIST = 'observacao/CLEAR_LIST';
export const LIST = 'observacao/LIST';
export const ADD = 'observacao/ADD';
export const OBS_ST = 'observacao/OBS_ST';
export const LIST_PED = 'observacao/LIST_PED';

const initialState = {
  obs: [],
  ped: [],
  systextil: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CLEAR_LIST: {
      return { ...state, obs: [] };
    }
    case LIST: {
      return { ...state, obs: action.data };
    }
    case ADD: {
      const newData = action.data;
      newData.dataObservacao = formatDate(action.data.dataObservacao);
      return { ...state, obs: [action.data, ...state.obs] };
    }
    case OBS_ST: {
      const obs1 = action.obs1 ? action.obs1 : '';
      const obs2 = action.obs2 ? action.obs2 : '';
      return { ...state, systextil: obs1 + obs2 };
    }
    case LIST_PED: {
      return { ...state, ped: action.data };
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

export const clearList = () => {
  return dispatch => dispatch({
    type: CLEAR_LIST
  });
};

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

export function getStObs(op) {
  const url = `/api/observacao/systextil/op/${op}`;
  return (dispatch) => {
    axios.get(url)
      .then(res => dispatch({
        type: OBS_ST,
        obs1: res.data.first,
        obs2: res.data.second
      }));
  };
}

export function listPeD(referencia) {
  const url = `/api/observacao/referencia/${referencia}`;
  return (dispatch) => {
    axios.get(url)
      .then(res => dispatch({
        type: LIST_PED,
        data: res.data
      }));
  };
}
