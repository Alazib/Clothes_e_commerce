import { createContext, useState } from "react"

const addCartItem = (cartProducts, productToAdd) => {
  const productAlreadyExist = cartProducts.find(
    (product) => product.id === productToAdd.id
  )

  if (productAlreadyExist) {
    return cartProducts.map((product) =>
      product.id === productAlreadyExist.id
        ? { ...product, quantity: product.quantity + 1 }
        : product
    )
  }

  return [...cartProducts, { ...productToAdd, quantity: 1 }]
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => null,
  cartProducts: [],
  addProductToCart: () => null,
})

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartProducts, setCartProducts] = useState([])

  const addProductToCart = (productToAdd) => {
    setCartProducts(addCartItem(cartProducts, productToAdd))
  }

  const value = { isCartOpen, setIsCartOpen, cartProducts, addProductToCart }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
