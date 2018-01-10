import { push } from 'react-router-redux';
import { token } from '../../utils/token';

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
    if (token.get()) {
      dispatch({
        type: LOGGED_IN,
        user: `Beta - ${token.get()}`
      });
    } else {
      dispatch(push('/signin'));
    }
  };
}

export function singIn(email, password) {
  return (dispatch) => {
    if (email === password) {
      token.save(email);
      dispatch(push('/'));
    }
  };
}

export function signOut() {
  return (dispatch) => {
    token.delete();
    dispatch({
      type: LOGGED_OUT
    });
    window.location.reload();
  };
}
