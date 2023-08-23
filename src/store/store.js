import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux"
import logger from "redux-logger"
import { rootReducer } from "./root-reducer"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

/// Setting the persistence of the Redux store

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

///

/// Setting the Redux store

const middleWares = [logger] //This middleware loggs out the state of the store before and after the action hits the reducers
const composedEnhancers = compose(applyMiddleware(...middleWares))

export const store = createStore(persistedReducer, undefined, composedEnhancers)
export const persistor = persistStore(store)
///
