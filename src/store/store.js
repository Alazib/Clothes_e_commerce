import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux"
import logger from "redux-logger"
import { rootReducer } from "./root-reducer"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import thunk from "redux-thunk"

/// Setting the persistence of the Redux store

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["categories"],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

///

/// Setting the Redux store

const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  thunk,
].filter(Boolean) // Middlewares: 1)  Logger => loggs out the state of the store before and after the action hits the reducers.
//We don't want the logs in production mode.  2) Thunks => Allow us to use async functions as dispatched actions

const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose // If we are not in production AND the window object exists (in build mode there is no window object; we don't want redux dev extension
// in build mode in order to avoid breaks down), then use the 'compose' of Redux devtools extension; if not, use de compose of Redux

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares))

export const store = createStore(persistedReducer, undefined, composedEnhancers)
export const persistor = persistStore(store)
///
