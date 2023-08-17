import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux"
import logger from "redux-logger"

import { rootReducer } from "./root-reducer"

const middleWares = [logger] //This middleware loggs out the state of the store before and after the action hits the reducers
const composedEnhancers = compose(applyMiddleware(...middleWares))

export const store = createStore(rootReducer, undefined, composedEnhancers)
