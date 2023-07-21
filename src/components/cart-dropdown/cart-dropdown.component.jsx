import "./cart-dropdown.styles.scss"
import Button from "../../components/button/button.component"
import CartItem from "../cart-item/cart-item.component"
import { useContext } from "react"
import { CartContext } from "../../contexts/cart.context"

const CartDropdown = () => {
  const { cartProducts } = useContext(CartContext)

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartProducts.map((product) => (
          <CartItem product={product} key={product.id}></CartItem>
        ))}
      </div>
      <Button>GO TO CHECKOUT</Button>
    </div>
  )
}

export default CartDropdown
