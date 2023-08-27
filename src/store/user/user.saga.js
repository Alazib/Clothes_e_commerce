import { takeLatest, put, all, call } from "redux-saga/effects"
import { USER_ACTIONS_TYPES } from "./user.types"
import {
  createUserDocumentFromAuth,
  getCurrentUser,
} from "../../utils/firebase/firebase.utils"
import { signInFailed, signInSuccess } from "./user.action"

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    )
    yield put(signInSuccess({ ...userSnapshot.data(), id: userSnapshot.id }))
  } catch (error) {
    yield put(signInFailed(error))
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser)
    if (!userAuth) return
    yield call(getSnapshotFromUserAuth, userAuth)
  } catch (error) {}
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTIONS_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* userSaga() {
  yield all([call(onCheckUserSession)])
}
