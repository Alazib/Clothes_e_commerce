import { createContext, useState } from "react"

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

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
