import { takeLatest, put, all, call } from "redux-saga/effects"
import { USER_ACTIONS_TYPES } from "./user.types"
import { getCurrentUser } from "../../utils/firebase/firebase.utils"

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser)
    if (!userAuth) {
      // Here we create a new user in Firestore with a new Saga
    }
  } catch (error) {}
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTIONS_TYPES.CHECK_USER_SESSION)
}

export function* userSagas() {
  yield all(call([]))
}
