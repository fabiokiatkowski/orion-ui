import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger} from 'redux-logger'; //eslint-disable-line
import thunk from 'redux-thunk';
import rootReducer from '../redux/modules/reducer';

const logger = createLogger({ collapse: true });

const finalStore = compose(applyMiddleware(thunk, logger))(createStore);

module.exports = function configureStore(initialState) {
  const store = finalStore(rootReducer, initialState);
  if (module.hot) {
    module.hot.accept('../redux/modules/reducer', () => store.replaceReducer(require('../redux/modules/reducer').default)); //eslint-disable-line
  }
  return store;
};
