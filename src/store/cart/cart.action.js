import { createAction } from "../../utils/reducer/reducer.utils"

import { CART_ACTION_TYPES } from "./cart.types"

export const setIsCartOpenAction = (isOpen) =>
  createAction(CART_ACTION_TYPES.TOGGLE_DROPDOWN, isOpen)

export const addProductToCart = (cartProducts, productToAdd) => {
  const newCartItems = addCartItem(cartProducts, productToAdd)
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const removeProductFromCart = (cartProducts, productToRemove) => {
  const newCartItems = removeCartItem(cartProducts, productToRemove)
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const clearProductFromCart = (cartProducts, productToDelete) => {
  const newCartItems = clearCartItem(cartProducts, productToDelete)
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

// The auxiliar functions

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

  return clearCartItem(cartProducts, productToRemove)
}

const clearCartItem = (cartProducts, productToDelete) => {
  return cartProducts.filter((product) => {
    return product.id !== productToDelete.id
  })
}
