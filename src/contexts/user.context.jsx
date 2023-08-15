import { createContext, useEffect, useReducer } from "react"
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "../utils/firebase/firebase.utils"

//UserContext acts as a component that provides with the value you want to access
export const UserContext = createContext({
  currentUser: null,
  //This function does nothing
  setCurrentUser: () => null,
})

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT USER",
}

const userReducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      }

    default:
      throw new Error(`Unhandled type ${type} in userReducer`)
  }
}

const INITIAL_STATE = {
  currentUser: null,
}

//the component will wrap around any other component that needs access to user context
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE)
  const { currentUser } = state

  const setCurrentUser = (user) => {
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user })
  }

  const value = { currentUser, setCurrentUser }

  useEffect(() => {
    // This function CENTRALICES the management of setting new user and creating new user document, instead of doing it on each
    // individual document.
    //This function calls the listener onAuthStateChanged in firebase.utils.js when the App is mounted in order to keep tracking
    // whatever change in user's sign-in state occurs and to trigger the function inside it when this changes occur.
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user)
      }
      setCurrentUser(user) // If user is sign in 'set the user object' if not 'set null'
    })
    return unsubscribe
  }, [])
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
