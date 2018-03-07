import Immutable from 'immutable';
import axios from '../../axios-orion';

export const CURRENT_PROFILE = 'gridProfile/CURRENT_PROFILE';
export const CURRENT_COLUMNS = 'gridProfile/CURRENT_COLUMNS';
export const PROFILE_COLUMNS = 'gridProfile/PROFILE_COLUMNS';

const initialState = {
  columnsDef: new Immutable.Map()
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CURRENT_COLUMNS: {
      const map = new Immutable.Map(action.key, action.data);
      const mergedMap = state.columnsDef.merge(map);
      return { ...state, columnsDef: mergedMap };
    }
    default:
      return state;
  }
}

export function getCurrentProfile(gridName) {
  const url = `/api/grid/${gridName}/current-columns`;
  return (dispatch) => {
    axios.get(url)
      .then(res => dispatch({
        type: CURRENT_COLUMNS,
        key: gridName,
        data: res.data
      }));
  };
}
