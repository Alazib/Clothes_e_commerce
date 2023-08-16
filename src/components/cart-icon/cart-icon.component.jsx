import { useContext } from "react"
import {
  CartIconContainer,
  ItemCount,
  ShoppingIcon,
} from "./cart-icon.styles.jsx"
import { CartContext } from "../../contexts/cart.context"

const CartIcon = () => {
  const { updateCartDropdown } = useContext(CartContext)
  const { cartProducts } = useContext(CartContext)

  function handleCartDropping() {
    updateCartDropdown()
  }

  return (
    <CartIconContainer onClick={handleCartDropping}>
      <ShoppingIcon className="shopping-icon"></ShoppingIcon>
      <ItemCount>{cartProducts.length}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon
