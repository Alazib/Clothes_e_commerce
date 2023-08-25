import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils"
import { createAction } from "../../utils/reducer/reducer.utils"
import { CATEGORIES_ACTION_TYPES } from "./categories.types"

export const fetchCategoriesStart = (getState) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START)

export const fetchCategoriesSuccess = (categoriesArray) =>
  createAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    categoriesArray
  )

export const fetchCategoriesFailed = (error) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error)

// This is the thunk middleware. It allows us to pass a function -fetchCategoriesAsync()- ir order to
// be dispatched (in the useEffect of Shop), instead of passing the typical action -{type:..., action:...}. Thunk acts,
// as a middleware that it is, between the dispatch and the reducers
// https://redux.js.org/usage/writing-logic-thunks#why-use-thunks

export const fetchCategoriesAsync = () => async (dispatch, getState) => {
  dispatch(fetchCategoriesStart())

  try {
    const categoriesArray = await getCategoriesAndDocuments()
    dispatch(fetchCategoriesSuccess(categoriesArray))
  } catch (error) {
    dispatch(fetchCategoriesFailed(error))
  }
}
