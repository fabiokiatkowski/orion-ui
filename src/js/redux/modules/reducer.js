import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import image from './image';
import app from './app';
import session from './session';

const rootReducer = combineReducers({
  routing: routerReducer,
  app,
  image,
  session
});

export default rootReducer;
