import { Routes, Route } from "react-router"
import Home from "./routes/home/home.component"
import Navigation from "./routes/navigation/navigation.component"
import Authentication from "./routes/authentication/authentication.component"
import Shop from "./routes/shop/shop.component"
import CheckOut from "./routes/checkout/checkout.component"
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "../src/utils/firebase/firebase.utils"
import { useEffect } from "react"
import { setUserAction } from "./store/user/user-action"
import { useDispatch } from "react-redux"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    // This function CENTRALICES the management of setting new user and creating new user document, instead of doing it on each
    // individual document.
    //This function calls the listener onAuthStateChanged in firebase.utils.js when the App is mounted in order to keep tracking
    // whatever change in user's sign-in state occurs and to trigger the function inside it when this changes occur.
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        // If user signs-in in Firebase createUserDocument
        //and 'dispatch the user action' Redux .
        createUserDocumentFromAuth(user)
      }
      // If user signs-out in Firebase 'dispatch the user action'
      // Redux (with null)
      dispatch(setUserAction(user))
    })
    return unsubscribe
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<CheckOut />}></Route>
      </Route>
    </Routes>
  )
}

export default App
