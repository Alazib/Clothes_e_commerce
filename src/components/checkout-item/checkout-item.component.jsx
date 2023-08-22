import "./checkout-item.styles.scss"
import { useDispatch, useSelector } from "react-redux"
import { selectCartProducts } from "../../store/cart/cart.selector"
import {
  addProductToCart,
  removeProductFromCart,
  clearProductFromCart,
} from "../../store/cart/cart.action"

const CheckoutItem = ({ product }) => {
  const dispatch = useDispatch()

  const { name, imageUrl, price, quantity } = product

  const cartProducts = useSelector(selectCartProducts)

  const clearProduct = () =>
    dispatch(clearProductFromCart(cartProducts, product))

  const incrementProduct = () =>
    dispatch(addProductToCart(cartProducts, product))

  const removeProduct = () =>
    dispatch(removeProductFromCart(cartProducts, product))

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeProduct}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={incrementProduct}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={clearProduct}>
        &#10005;
      </div>
    </div>
  )
}

export default CheckoutItem
