import { Outlet } from "react-router-dom"
import { useContext } from "react"

import {
  NavigationContainer,
  LogoContainer,
  NavLink,
  NavLinksContainer,
  RackLogo,
} from "./navigation.styles.jsx"
import { signOutUser } from "../../utils/firebase/firebase.utils"
import CartIcon from "../../components/cart-icon/cart-icon.component"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component"
import { CartContext } from "../../contexts/cart.context"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../store/user/user.selector"

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser)

  const { isCartOpen } = useContext(CartContext)

  return (
    <>
      <NavigationContainer>
        <LogoContainer to="/">
          <RackLogo />
        </LogoContainer>

        <NavLinksContainer>
          <NavLink to="/shop">SHOP</NavLink>

          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
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
