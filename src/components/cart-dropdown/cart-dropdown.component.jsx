import {
  CartDropdownContainer,
  CartItems,
  EmptyMessage,
} from "./cart-dropdown.styles.jsx"
import Button from "../../components/button/button.component"
import CartItem from "../cart-item/cart-item.component"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCartProducts } from "../../store/cart/cart.selector.js"

const CartDropdown = () => {
  const cartProducts = useSelector(selectCartProducts)
  const navigate = useNavigate()

  const goToCheckout = () => {
    navigate("/checkout")
  }

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartProducts.length ? (
          cartProducts.map((product) => (
            <CartItem product={product} key={product.id}></CartItem>
          ))
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>

      <Button onClick={goToCheckout}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  )
}

export default CartDropdown
