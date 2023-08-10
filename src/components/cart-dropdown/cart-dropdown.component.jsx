import "./cart-dropdown.styles.scss"
import Button from "../../components/button/button.component"
import CartItem from "../cart-item/cart-item.component"
import { useContext } from "react"
import { CartContext } from "../../contexts/cart.context"
import { useNavigate } from "react-router-dom"

const CartDropdown = () => {
  const { cartProducts } = useContext(CartContext)
  const navigate = useNavigate()

  const goToCheckout = () => {
    navigate("/checkout")
  }

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartProducts.length ? (
          cartProducts.map((product) => (
            <CartItem product={product} key={product.id}></CartItem>
          ))
        ) : (
          <span>Your cart is empty</span>
        )}
      </div>

      <Button onClick={goToCheckout}>GO TO CHECKOUT</Button>
    </div>
  )
}

export default CartDropdown
