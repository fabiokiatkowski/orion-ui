import { push } from 'react-router-redux';
import axios from '../../axios-orion';

const LOGGED_IN = 'session/LOGGED_IN';
const LOGGED_OUT = 'session/LOGGED_OUT';
const CHANGE_CRACHA = 'session/CHANGE_CRACHA';

const initialState = {
  currentUser: null,
  selectApelido: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGGED_IN:
      return { ...state, currentUser: action.user };
    case LOGGED_OUT:
      return { ...state, currentUser: null };
    case CHANGE_CRACHA:
      return { ...state, selectApelido: action.apelido };
    default:
      return state;
  }
}

export function currentUser() {
  return (dispatch) => {
    axios.get('api/user/currentUser')
      .then(res => dispatch({
        type: LOGGED_IN,
        user: res.data
      })).catch(() => {
        localStorage.removeItem('orion.authToken');
        dispatch(push('/signIn'));
      });
  };
}

export function loginSucess() {
  return dispatch => dispatch(push('/'));
}

export function logOut() {
  return (dispatch) => {
    localStorage.removeItem('orion.authToken');
    dispatch({ type: LOGGED_OUT });
    dispatch(push('/signIn'));
  };
}

export function getApelido(codUser) {
  return (dispatch) => {
    axios.get(`api/user/${codUser}/apelido`)
      .then((res) => {
        dispatch({
          type: CHANGE_CRACHA,
          apelido: res.data
        });
      });
  };
}
