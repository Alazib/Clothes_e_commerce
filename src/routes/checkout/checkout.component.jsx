import { useContext } from "react"
import { CartContext } from "../../contexts/cart.context"
import "./checkout.styles.scss"
import CheckoutItem from "../../components/checkout-item/checkout-item.component"

const CheckOut = () => {
  const { cartProducts, totalPrice } = useContext(CartContext)

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>

      {cartProducts.map((product) => {
        return <CheckoutItem id={product.id} product={product}></CheckoutItem>
      })}
      <span className="total">Total: {`${totalPrice}$`}</span>
    </div>
  )
}

export default CheckOut
