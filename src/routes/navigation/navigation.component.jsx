import { Outlet } from "react-router-dom"
import {
  NavigationContainer,
  LogoContainer,
  NavLink,
  NavLinksContainer,
  RackLogo,
} from "./navigation.styles.jsx"
import CartIcon from "../../components/cart-icon/cart-icon.component"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../store/user/user.selector"
import { selectIsCartOpen } from "../../store/cart/cart.selector.js"
import { useDispatch } from "react-redux"
import { signOutStart } from "../../store/user/user.action.js"

const Navigation = () => {
  const dispatch = useDispatch()

  const currentUser = useSelector(selectCurrentUser)

  const isCartOpen = useSelector(selectIsCartOpen)

  const handleSignOut = () => {
    dispatch(signOutStart())
  }

  return (
    <>
      <NavigationContainer>
        <LogoContainer to="/">
          <RackLogo />
        </LogoContainer>

        <NavLinksContainer>
          <NavLink to="/shop">SHOP</NavLink>

          {currentUser ? (
            <NavLink as="span" onClick={handleSignOut}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinksContainer>

        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </>
  )
}

export default Navigation
