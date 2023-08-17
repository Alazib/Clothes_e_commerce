export const USER_ACTIONS_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
}

const INITIAL_STATE = {
  currentUser: null,
}

// Here we can see 2 main differences beetwen using context-api + useReducer and Redux:

// 1 --> Since here we are not using useReducer anymore we need to pass an initial state (default value) to the userReducer 'state' parameter
// (with useReducer we pass it on it)

// 2 --> With the context-api + useReducer, one action only dispatches its own reducer (ex: a cart action only dispatches cartReducer(), but not the userReducer() one).
// Here it's different because every single reducer receives every single action inside of Redux (ex: an action triggered by cart will be received by
// cartReducer but also by all the rest of the reducers -userReducer, categoriesReducer...-). This is because all the single reducers are joined
//in a single big one reducer called 'root-reducer'.  So, in the switch statement, instead of throwing a Error on the 'default' case, we have to return
//the state (in this case, if the action comes from cart it will return the same user state, because that action doesn't belong to user)

export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action

  switch (type) {
    case USER_ACTIONS_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload }

    default:
      return state
  }
}
