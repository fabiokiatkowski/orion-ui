import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { createLogger } from 'redux-logger';
import rootReducer from '../redux/modules/reducer';

export const history = createHistory();

const initialState = {};
const enhancers = [];
const middleware = [
  thunk,
  routerMiddleware(history)
];

const DEV = process.env.NODE_ENV === 'development';

if (DEV) {
  const { devToolExtension } = window;
  if (typeof devToolExtension === 'function') {
    enhancers.push(devToolExtension());
  }

  const logger = createLogger({ collapse: true });
  middleware.push(logger);
}

const composeEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers
);

export default store;
