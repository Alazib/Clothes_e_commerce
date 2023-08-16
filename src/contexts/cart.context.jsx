import { createContext, useReducer } from "react"

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

//////
// Why did we migrate from useState to useReducer? In this particular case when we add/remove/delete any product from the cart we needed also to update
// the totalPrice with a useEffect (and the totalNumberOfProducts with a different useEffect but, in this case, I handled it as a cartProducts.length directly in the code
// instead of as another state). So,
// when a singular change requieres aditional changes it would be recommended to use a useReducer in order to handle the hole procees at once, at a single operation
// as if it was a batch (line 48) ; instead of handle the process as if it was a sequence of steps => 1) update with the useState the carProducts AND 2) update with the useEffect the totalPrice whenever
// cartProducts updates AND 3) update with the useEffect the totalNumberOfProdudcts whenever cartProducts updates

const cartReducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case "SET_CART_ITEMS": {
      return {
        ...state,
        ...payload,
      }
    }

    case "TOGGLE_DROPDOWN": {
      return {
        ...state,
        ...payload,
      }
    }

    default:
      throw new Error(`unhandled type of ${type} in cartReducer`)
  }
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartProducts: [],
  totalPrice: 0,
}

//////

export const CartContext = createContext({
  isCartOpen: false,
  cartProducts: [],
  totalPrice: 0,
  setIsCartOpen: () => null,
  addProductToCart: () => null,
  removeProductFromCart: () => null,
  deleteProductFromCart: () => null,
})

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE)

  const { isCartOpen, cartProducts, totalPrice } = state

  const updateCartContent = (newCartItems) => {
    const newTotalPrice = newCartItems.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    )

    dispatch({
      type: "SET_CART_ITEMS",
      payload: {
        cartProducts: newCartItems,
        totalPrice: newTotalPrice,
      },
    })
  }

  const updateCartDropdown = () => {
    dispatch({
      type: "TOGGLE_DROPDOWN",
      payload: {
        isCartOpen: !isCartOpen,
      },
    })
  }

  const addProductToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartProducts, productToAdd)
    updateCartContent(newCartItems)
  }

  const removeProductFromCart = (productToRemove) => {
    const newCartItems = removeCartItem(cartProducts, productToRemove)
    updateCartContent(newCartItems)
  }

  const deleteProductFromCart = (productToDelete) => {
    const newCartItems = deleteCartItem(cartProducts, productToDelete)
    updateCartContent(newCartItems)
  }

  const value = {
    isCartOpen,
    updateCartDropdown,
    cartProducts,
    addProductToCart,
    removeProductFromCart,
    deleteProductFromCart,
    totalPrice,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
