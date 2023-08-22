import {
  CartIconContainer,
  ItemCount,
  ShoppingIcon,
} from "./cart-icon.styles.jsx"

import { useDispatch, useSelector } from "react-redux"
import { setIsCartOpenAction } from "../../store/cart/cart.action.js"
import {
  selectIsCartOpen,
  selectCartCount,
} from "../../store/cart/cart.selector.js"

const CartIcon = () => {
  const dispatch = useDispatch()

  const isCartOpen = useSelector(selectIsCartOpen)
  const cartTotalCount = useSelector(selectCartCount)

  const handleCartDropping = () => dispatch(setIsCartOpenAction(!isCartOpen))

  return (
    <CartIconContainer onClick={handleCartDropping}>
      <ShoppingIcon className="shopping-icon"></ShoppingIcon>
      <ItemCount>{cartTotalCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon
