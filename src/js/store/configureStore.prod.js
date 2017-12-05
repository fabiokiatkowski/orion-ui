import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../redux/modules/reducer';

const finalStore = compose(applyMiddleware(thunk))(createStore);

module.exports = function configureStore(initialState) {
  const store = finalStore(rootReducer, initialState);
  return store;
};
