import { combineReducers } from 'redux';
import userInfo from './userInfo';
import representante from './representante';
import agGridXp from './agGridXp';

const rootReducer = combineReducers({
  representante,
  userInfo,
  agGridXp
});

export default rootReducer;
