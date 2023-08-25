import { all, call } from "redux-saga/effects"

// Redux-Saga is also a middleware but has a main difference with Redux-Thunk: while Redux Thunk acts after the dispatch and before reducers (
// (in the middle of both )Saga acts always AFTER reducers: The dispatched action pass through the middlewares, hits the reducer and then Saga acts.
// Once Saga performs, the flow may return again to the middleware, pass again through reducers and again to de Saga.
// Sagas themselves are based off of JavaScript generator functions.

export function* rootSaga() {}
