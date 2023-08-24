//Selectors have to transform the data into the final shape that you want.
//It is where the bussines logic of Redux lives

// PROBLEM: Uneeded re-render of Category each time an action is passed to the root reducer.
// First of all we have to know: --> Each time a portion of the state changes (categories, user, etc)(every time an action is dispatched), THE WHOLE STATE UPDATES (is being reduced by Redux,
// because a single action is passed through all reducers -root reducer- and each reducer returns always a state: one reducer will return a new state -the reducer which belongs the action-
// and the rest of reducers will return the same state as before), so the rest of all the existent useSelectors are triggered also to check if its state has updated and
// the differents componentes where they live needs to re-render.
//  As Redux DOCUMENTATION sais: "Selectors used with useSelector or mapState will be re-run after every dispatched action, regardless of what section of the Redux root state was actually updated.
//  Re-running expensive calculations when the input state sections didn't change is a waste of CPU time, and it's very likely that the inputs won't have changed most of the time anyway"
// Knowing that, what's the problem? selectCategoriesMap() always returns a different object in memory (despite being the same object
// -categoriesMap- : state.categories.categories has always the same value because we never modify it from its Firebase origin). (remember --> {a: 2} and {a: 2} are diffe-
// rent objects to JavaScript because it assings one difference place in memory for each one). Functions as reduce, map, filter... gives back us
// a new array/object (a new reference, in fact), so the useSelector of Category thinks that has a new categoriesMap an re-render Category.
// As Redux DOCUMENTATION sais: "useSelector and mapState rely on === reference equality checks of the return values to determine if the component needs to re-render.
// If a selector always returns new references, it will force the component to re-render even if the derived data is effectively the same as last time. This is especially common with array operations like map() and filter(), which return new array references."

// SOLUTION:
// Caching the selectors. If we select the same that we selected before (in this case, state.categories that only change once: in the first render when its value is set),
// the selector does not perform a selection and selectCategoriesMap doesn't trigger. Category tries to set categoriesMap (line 13), but
// selectCategories doesn't not trigger due to the previous caching wieth createSelector.
// Now, if I LogOut, Category not re-render again.
// READ: https://redux.js.org/usage/deriving-data-selectors#optimizing-selectors-with-memoization

import { createSelector } from "reselect"

// This function give us back the whole state from 'categories' reducer.
const selectCategoriesReducer = (state) => state.categories

//This selector give us back the portion of the whole state form categoriesReducer that we need: the 'categories' state.
// This selector is a memoized selector: the output runs only when the whole state from 'categoriesReducer' (get from selectCategoriesReducer)
// has changed (when the whole state of categories reducer gets updated). If not, it returns the SAME value (so, with the SAME reference): the cached value
export const selectCategories = createSelector(
  [selectCategoriesReducer],
  (categoriesReducer) => categoriesReducer.categories
)

//This selector give us back the categoriesMap.
// This selector is a memoized selector: the output runs only when 'categories'(get from selectCategories)
// is different (when it get updated). If not, it returns the SAME value (so, with the SAME reference): the cached value
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category
      acc[title.toLowerCase()] = items
      return acc
    }, {})
)

export const selectCategoriesIsLoading = createSelector(
  [selectCategoriesReducer],
  (categoriesReducer) => categoriesReducer.isLoading
)

// We have created one createSelector for each value than I want to memoize: one in order to memoize the whole state of
// the 'categoriesReducer' (line 36) and another to memoize only 'categories' (line 41).
// Now, if we LogOut, neither selectCategories nor selectCategoriesMap will run their outputs (because its inputs [...] never change);
// so they return always the cached value from the beginning when Shop fetches the value of 'categories' from Firestore and thus Category
// will never re-render needlessly
