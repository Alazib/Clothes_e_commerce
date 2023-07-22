import { createContext, useEffect, useState } from "react"

const addCartItem = (cartProducts, productToAdd) => {
  const productThatAlreadyExists = cartProducts.find(
    (product) => product.id === productToAdd.id
  )

  if (productThatAlreadyExists) {
    return cartProducts.map((product) =>
      product.id === productThatAlreadyExists.id
        ? { ...product, quantity: product.quantity + 1 }
        : product
    )
  }

  return [...cartProducts, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartProducts, productToRemove) => {
  if (productToRemove.quantity > 1) {
    return cartProducts.map((product) => {
      return product.id === productToRemove.id
        ? { ...productToRemove, quantity: productToRemove.quantity - 1 }
        : product
    })
  }

  return deleteCartItem(cartProducts, productToRemove)
}

const deleteCartItem = (cartProducts, productToDelete) => {
  return cartProducts.filter((product) => {
    return product.id !== productToDelete.id
  })
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => null,
  cartProducts: [],
  addProductToCart: () => null,
  removeProductFromCart: () => null,
  deleteProductFromCart: () => null,
  totalPrice: 0,
})

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartProducts, setCartProducts] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    const newTotalPrice = cartProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    )

    setTotalPrice(newTotalPrice)
  }, [cartProducts])

  const addProductToCart = (productToAdd) => {
    setCartProducts(addCartItem(cartProducts, productToAdd))
  }

  const removeProductFromCart = (productToRemove) => {
    setCartProducts(removeCartItem(cartProducts, productToRemove))
  }

  const deleteProductFromCart = (productToDelete) => {
    setCartProducts(deleteCartItem(cartProducts, productToDelete))
  }

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartProducts,
    addProductToCart,
    removeProductFromCart,
    deleteProductFromCart,
    totalPrice,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
