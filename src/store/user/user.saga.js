import { takeLatest, put, all, call } from "redux-saga/effects"
import { USER_ACTIONS_TYPES } from "./user.types"
import {
  createUserDocumentFromAuth,
  createUserWithEmailAndPassword,
  getCurrentUser,
  signInWithEmailAndPassword,
  signInWithGooglePopup,
  signOutUser,
} from "../../utils/firebase/firebase.utils"
import {
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutSuccess,
  signUpFailed,
  signUpSuccess,
} from "./user.action"

//This function coordinates the three next generation functions of userSaga with Firebase. Checks
export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    )

    console.log(userSnapshot.data())
    yield put(
      signInSuccess({
        ...userSnapshot.data(),
        id: userSnapshot.id,
      })
    )
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

export function* signUpStart(action) {
  const { payload } = action
  const { email, password, displayName } = payload
  try {
    const { user } = yield call(createUserWithEmailAndPassword, email, password)
    yield put(signUpSuccess(user, displayName))
  } catch (error) {
    yield put(signUpFailed(error))
  }
}

export function* signInAfterSignUpSuccess(action) {
  const { payload } = action
  const { user, additionalDetails } = payload
  console.log(additionalDetails)
  yield call(getSnapshotFromUserAuth, user, { additionalDetails })
}

export function* signOutStart() {
  try {
    yield call(signOutUser)
    yield put(signOutSuccess())
  } catch (error) {
    yield put(signOutFailed(error))
  }
}

//
//
//These 'on...' Sagas below are where we receive actions. They are the ENTRY POINT OF Saga. The actions
// have already passed through the middleware (except Saga) and the reduce  and finally have hit the Saga.

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTIONS_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTIONS_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignIn() {
  yield takeLatest(USER_ACTIONS_TYPES.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onSignUpStart() {
  yield takeLatest(USER_ACTIONS_TYPES.SIGN_UP_START, signUpStart)
}

export function* onSignUpSuccess() {
  yield takeLatest(USER_ACTIONS_TYPES.SIGN_UP_SUCCESS, signInAfterSignUpSuccess)
}

export function* onSignOutStart() {
  yield takeLatest(USER_ACTIONS_TYPES.SIGN_OUT_START, signOutStart)
}

//
//
// This is an acumulator that holds all the sagas that are related to user
export function* userSaga() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignIn),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ])
}
