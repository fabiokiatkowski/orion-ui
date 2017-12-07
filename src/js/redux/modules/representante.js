export const LIST = 'representante/LIST';

const initialState = {
  data: []
};

const tempData = [
  { name: 'João' },
  { name: 'Malaquias' },
  { name: 'Jozoias' },
  { name: 'Jizf' },
  { name: 'foo' },
  { name: 'bar' },
  { name: 'Matheues' }
];

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
    dispatch({
      type: LIST,
      data: tempData
    });
  };
}
