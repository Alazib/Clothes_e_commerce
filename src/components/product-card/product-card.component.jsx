import Button, { BUTTON_TYPES } from "../button/button.component"
import "./product-card.styles.scss"
import { useDispatch, useSelector } from "react-redux"
import { addProductToCart } from "../../store/cart/cart.action"
import { selectCartProducts } from "../../store/cart/cart.selector"

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()

  const { name, price, imageUrl } = product
  const cartProducts = useSelector(selectCartProducts)

  const handleCartProducts = () =>
    dispatch(addProductToCart(cartProducts, product))

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
