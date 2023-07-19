import { Outlet, Link } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../../contexts/user.context"
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"
import "./navigation.styles.scss"
import { signOutUser } from "../../utils/firebase/firebase.utils"

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext)
  const signOutHandler = async () => {
    const response = await signOutUser()
    setCurrentUser(null)
    console.log(response)
  }
  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>

        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>

          {currentUser ? (
            <span className="nav-link" onClick={signOutHandler}>
              {" "}
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default Navigation
