import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import { watchAuth, watchCanvas, watchDoodle } from './sagas';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

export const configureStore = () => {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk, sagaMiddleware)),
  );

  sagaMiddleware.run(watchAuth);
  sagaMiddleware.run(watchCanvas);
  sagaMiddleware.run(watchDoodle);

  return store;
};
