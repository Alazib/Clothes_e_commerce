import { takeLatest, all, call, put } from "redux-saga/effects"
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils"
import {
  fetchCategoriesFailed,
  fetchCategoriesSuccess,
} from "./categories.action"
import { CATEGORIES_ACTION_TYPES } from "./categories.types"

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCategoriesAndDocuments, "categories") //Anywhere we have a function and we want to turn it into
    //an effect we use 'call'. We pass it as parameters the function to be called and its arguments.
    console.log(categoriesArray)
    yield put(fetchCategoriesSuccess(categoriesArray)) // Instead of dispatch, we use put.
  } catch (error) {
    yield put(fetchCategoriesFailed(error))
  }
}

export function* onFetchCategoriesStart() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  ) //Here is where we receive actions. This action has already passed through the reducer (now 'isLoading: true') and has hit the Saga.
  // takeLatest says: "If you hear a bunch of the same action, give me the latest one"
}

//
// This is an acumulator that holds all the sagas that are related to categories
export function* categoriesSaga() {
  yield all([call(onFetchCategoriesStart)]) // This is an effect that runs everything inside and only complete when all of it is done. It's a pause for this level
  //until everything on this line following the yield is finished. When all has finished, the succes action (o error action in case) will pass
  // through middleware again (except Sagas), will hit the reducer and will hit Saga again (but, in this case, Saga is not listening to success/error action...so,
  // nothing will happen)
}
