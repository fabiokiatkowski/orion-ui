export const ROW_DATA_CHANGE = 'agGridXp/ROW_DATA_CHANGE';
export const ROW_DATA_SELECT = 'agGridXp/ROW_DATA_SELECT';


const initialState = {
  rowData: [],
  rowSelection: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ROW_DATA_CHANGE: {
      return { ...state, rowData: action.rowData };
    }
    case ROW_DATA_SELECT: {
      return { ...state, rowSelection: action.rowSelection };
    }
    default:
      return state;
  }
}

export function updateRowData(rowData) {
  return (dispatch) => {
    dispatch({
      type: ROW_DATA_CHANGE,
      rowData
    });
  };
}

export function updateRowSelection(rowSelection) {
  return (dispatch) => {
    dispatch({
      type: ROW_DATA_CHANGE,
      rowSelection
    });
  };
}
