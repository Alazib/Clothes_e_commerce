import { takeLatest, put, all, call } from "redux-saga/effects"
import { USER_ACTIONS_TYPES } from "./user.types"
import {
  createUserDocumentFromAuth,
  getCurrentUser,
  signInWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils"
import { signInFailed, signInSuccess } from "./user.action"

//This function coordinates the three next generation functions of userSaga with Firebase
export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    )
    console.log(userSnapshot.data())
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
  } catch (error) {
    console.log(error)
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup)
    yield call(getSnapshotFromUserAuth, user)
  } catch (error) {
    yield put(signInFailed(error))
  }
}

export function* signInWithEmail(action) {
  //Saga receives de full action that previously has passed trough the reducer
  const { payload } = action
  const { email, password } = payload
  try {
    const { user } = yield call(signInWithEmailAndPassword, email, password)
    yield call(getSnapshotFromUserAuth, user)
  } catch (error) {
    yield put(signInFailed(error))
  }
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTIONS_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTIONS_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignIn() {
  yield takeLatest(USER_ACTIONS_TYPES.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* userSaga() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignIn),
  ])
}
