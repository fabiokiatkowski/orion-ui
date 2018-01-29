import { push } from 'react-router-redux';
import axios from '../../axios-orion';

const LOGGED_IN = 'session/LOGGED_IN';
const LOGGED_OUT = 'session/LOGGED_OUT';

const initialState = {
  currentUser: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGGED_IN:
      return { ...state, currentUser: action.user };
    case LOGGED_OUT:
      return { ...state, currentUser: null };
    default:
      return state;
  }
}

export function currentUser() {
  return (dispatch) => {
    axios.get('api/user/currentUser')
      .then(res => dispatch({
        type: LOGGED_IN,
        user: res
      })).catch(() => {
        localStorage.removeItem('orion.authToken');
        dispatch(push('/signIn'));
      });
  };
}

export function loginSucess() {
  return dispatch => dispatch(push('/'));
}
