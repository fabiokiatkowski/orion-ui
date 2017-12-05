export const GET = 'userInfo/GET';

const initialState = {
  userInfo: {
    user: {
      id: 0,
      name: '',
      nickname: ''
    },
    stages: [{
      stageId: 0,
      stageName: 'Hello World.',
      stageLeadTime: 0.0,
    },
    ]
  },
  searchString: '',
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET: {
      console.log(action.data);
      return Object.assign(state, action.data);
    }
    default:
      return state;
  }
}

export function getSync(userId) {
  return (dispatch) => {
    fetch(`http://192.168.0.193:8080/users/${userId}/stages`)
      .then(response => response.json())
      .then(data => dispatch({
        type: GET,
        data
      }));
  };
}

