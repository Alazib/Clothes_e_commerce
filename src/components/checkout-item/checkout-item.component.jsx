import { useContext } from "react"
import "./checkout-item.styles.scss"
import { CartContext } from "../../contexts/cart.context"

const CheckoutItem = ({ product }) => {
  const { name, imageUrl, price, quantity } = product

  const { addProductToCart, removeProductFromCart, deleteProductFromCart } =
    useContext(CartContext)

  function deleteProduct() {
    deleteProductFromCart(product)
  }
  function incrementProduct() {
    addProductToCart(product)
  }

  function removeProduct() {
    removeProductFromCart(product)
  }

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
      <div className="remove-button" onClick={deleteProduct}>
        &#10005;
      </div>
    </div>
  )
}

export default CheckoutItem
