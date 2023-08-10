import { useContext } from "react"
import {
  CartIconContainer,
  ItemCount,
  ShoppingIcon,
} from "./cart-icon.styles.jsx"
import { CartContext } from "../../contexts/cart.context"

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen } = useContext(CartContext)
  const { cartProducts } = useContext(CartContext)
  console.log("icono")
  function handleCartDropping() {
    setIsCartOpen(!isCartOpen)
  }

  return (
    <CartIconContainer onClick={handleCartDropping}>
      <ShoppingIcon className="shopping-icon"></ShoppingIcon>
      <ItemCount>{cartProducts.length}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon
