import { Routes, Route } from "react-router"
import Home from "./routes/home/home.component"
import Navigation from "./routes/navigation/navigation.component"
import Authentication from "./routes/authentication/authentication.component"
import Shop from "./routes/shop/shop.component"
import CheckOut from "./routes/checkout/checkout.component"
import {
  createUserDocumentFromAuth,
  getCurrentUser,
  onAuthStateChangedListener,
} from "../src/utils/firebase/firebase.utils"
import { useEffect } from "react"
import { setUserAction } from "./store/user/user.action"
import { useDispatch } from "react-redux"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    getCurrentUser().then((userAuth) => {
      console.log(userAuth)
    })
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
