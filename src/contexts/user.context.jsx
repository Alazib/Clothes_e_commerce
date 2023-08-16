import { createContext, useState, useEffect } from "react"
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

//the component will wrap around any other component that needs access to user context
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
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
