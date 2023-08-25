import { all, call } from "redux-saga/effects"

// Redux-Saga is also a middleware but has a main difference with Redux-Thunk: while Redux Thunk acts after the dispatch and before reducers (
// (in the middle of both )Saga acts always AFTER reducers: The dispatched action pass through the middlewares, hits the reducer and then Saga acts.
// Once Saga performs, the flow may return again to the middleware, pass again through reducers and again to Saga.
// Sagas themselves are based off of JavaScript generator functions.

export function* rootSaga() {}

//
//
//
//
//
//
// * Explanation of GENERATION FUNCTIONS:
// They are similar to async-await functions (but they are not). They pause their execution and stops whenever they see the key "yield"

function* gen() {
  console.log("a")
  console.log("b")
}

const gObject = gen() // A normal function should log 'a' and 'b', but in this case nothing happens.
// We have only instanciated the generator object, but the execution inside it is now paused.

console.log(gObject.next()) // Now, we run the generator and the log is: 'a' and 'b'. Also whe can see in the console the prop done: true
// telling us that the function has run its entire course (no 'yield' key has been reached),
// and another prop value: undefined (because no 'yield' key has reached).  --> {value: undefined, done: true}
//
//
//
function* gen2(i) {
  yield i
  yield i + 10
}

const g2Object = gen2(5)
console.log(g2Object.next()) // Now, we run the generator and the log is: 5. Also whe can see in the console the prop done: false
// telling us that the function has not run its entire course:  we can continue to the next yield (yield i + 10).
console.log(g2Object.next()) // If we run the generator again, the log is: 15. Also whe can see in the console the prop done: false
// telling us that the function has not run its entire course
console.log(g2Object.next()) // If we run the generator again, the log is: undefined (because no 'yield' key has reached). Also whe can
//see in the console the prop done: true, telling us that the function has run its entire course (because no 'yield' key has reached)

//
//
//
function* gen3(i) {
  yield i
  yield i + 10
  return "Se acabó"
}

const g3Object = gen3(5)
console.log(g3Object.next())
console.log(g3Object.next())
console.log(g3Object.next()) // We get the same logs as with g2object, but in this case in the final log we get {value: 'Se acabó', done: true}. When
// there is no more yield 'keys' the generator objects returns the return value

// We use generation functions when we want to stash multiple executions but we want to control when we want to move in order to continue
// the funciont onwards. So to speak: they are functions that can be paused.
