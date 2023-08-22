import "./checkout.styles.scss"
import CheckoutItem from "../../components/checkout-item/checkout-item.component"
import { useSelector } from "react-redux"
import {
  selectCartProducts,
  selectCartTotalPrice,
} from "../../store/cart/cart.selector"

const CheckOut = () => {
  const cartProducts = useSelector(selectCartProducts)
  const totalPrice = useSelector(selectCartTotalPrice)

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
        return <CheckoutItem key={product.id} product={product}></CheckoutItem>
      })}
      <span className="total">Total: {`${totalPrice}$`}</span>
    </div>
  )
}

export default CheckOut
