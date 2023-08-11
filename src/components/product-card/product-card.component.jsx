import { useContext } from "react"
import Button, { BUTTON_TYPES } from "../button/button.component"
import "./product-card.styles.scss"
import { CartContext } from "../../contexts/cart.context"

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product
  const { addProductToCart } = useContext(CartContext)

  const handleCartProducts = () => {
    addProductToCart(product)
  }

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}$</span>
      </div>
      <Button buttonType={BUTTON_TYPES.inverted} onClick={handleCartProducts}>
        Add to card
      </Button>
    </div>
  )
}

export default ProductCard
