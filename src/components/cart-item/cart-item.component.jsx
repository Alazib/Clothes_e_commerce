import "./cart-item.styles.scss"

const CartItem = ({ product }) => {
  const { name, quantity } = product
  return (
    <div>
      <h2>{name}</h2>
      <span>{quantity}</span>
    </div>
  )
}

export default CartItem
