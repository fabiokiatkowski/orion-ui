import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger} from 'redux-logger'; //eslint-disable-line
import thunk from 'redux-thunk';
import rootReducer from '../redux/modules/reducer';

const DEV = process.env.NODE_ENV === 'development';

const logger = createLogger({ collapse: true });

const finalStoreProd = compose(applyMiddleware(thunk))(createStore);
const finalStoreDev = compose(applyMiddleware(thunk, logger))(createStore);

module.exports = function configureStore(initialState) {
  const store = (DEV) ? finalStoreDev(rootReducer, initialState) :
    finalStoreProd(rootReducer, initialState);

  if (DEV && module.hot) {
    module.hot.accept('../redux/modules/reducer', () =>
      store.replaceReducer(require('../redux/modules/reducer').default)); //eslint-disable-line
  }
  return store;
};
