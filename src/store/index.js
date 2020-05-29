import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import ReduxThunk from 'redux-thunk';

import persistReducer from './modules/persistReducers';

import reducers from './modules/rootReducer';
import sagas from './modules/rootSaga';

const middlewares = [ReduxThunk];

const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

middlewares.push(sagaMiddleware);

const composer = __DEV__
  ? compose(applyMiddleware(...middlewares), console.tron.createEnhancer())
  : compose(applyMiddleware(...middlewares));

const store = createStore(persistReducer(reducers), composer);
const persistor = persistStore(store);

sagaMiddleware.run(sagas);

export { store, persistor };