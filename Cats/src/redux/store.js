import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import rootSaga from "./sagas";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();

const createAppStore = () => {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(sagaMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : (noop) => noop
    )
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

export default createAppStore;
