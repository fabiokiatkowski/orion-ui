import { combineReducers } from 'redux';
import userInfo from './userInfo';
import agGridXp from './agGridXp';

const rootReducer = combineReducers({
  userInfo,
  agGridXp
});

export default rootReducer;
