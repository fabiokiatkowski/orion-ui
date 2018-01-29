export const LOAD_START = 'app/LOAD_START';
export const LOAD_END = 'app/LOAD_END';

const initialState = {
  isLoading: false,
  currentUser: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_START: {
      return { ...state, isLoading: true };
    }
    case LOAD_END: {
      return { ...state, isLoading: false };
    }
    default:
      return state;
  }
}

export function loadStart(dispatch) {
  dispatch({ type: LOAD_START });
}

export function loadEnd(dispatch) {
  dispatch({ type: LOAD_END });
}
