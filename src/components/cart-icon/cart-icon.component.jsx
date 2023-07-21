import { useContext } from "react"
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg"
import "./cart-icon.styles.scss"
import { CartContext } from "../../contexts/cart.context"

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen } = useContext(CartContext)
  const { cartProducts } = useContext(CartContext)
  console.log("icono")
  function handleCartDropping() {
    setIsCartOpen(!isCartOpen)
  }

  return (
    <div className="cart-icon-container" onClick={handleCartDropping}>
      <ShoppingIcon className="shopping-icon"></ShoppingIcon>
      <span className="item-count">{cartProducts.length}</span>
    </div>
  )
}

export default CartIcon
