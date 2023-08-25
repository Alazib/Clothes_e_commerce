import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux"
import logger from "redux-logger"
import { rootReducer } from "./root-reducer"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import createSagaMiddleware from "redux-saga"
import { rootSaga } from "./root-saga"

/// Setting the persistence of the Redux store

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
}

const sagaMiddleware = createSagaMiddleware()

const persistedReducer = persistReducer(persistConfig, rootReducer)

/// Setting the Redux store

const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  sagaMiddleware,
].filter(Boolean) // Middlewares: 1)  Logger => loggs out the state of the store before and after the action hits the reducers.
//We don't want the logs in production mode.  2) SagaMiddleware (actions reach Saga once the have hit reducer!!!)

const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose // If we are not in production AND the window object exists (in build mode there is no window object; we don't want redux dev extension
// in build mode in order to avoid breaks down), then use the 'compose' of Redux devtools extension; if not, use de compose of Redux

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares))

export const store = createStore(persistedReducer, undefined, composedEnhancers)
export const persistor = persistStore(store)

sagaMiddleware.run(rootSaga) // Saga middleware must be runned after the applyMiddleware phase.
///
