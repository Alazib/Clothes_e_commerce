import { createSelector } from "reselect"

const selectCartReducer = (state) => state.cart

export const selectCartProducts = createSelector(
  [selectCartReducer],
  (cartReducer) => cartReducer.cartProducts
)

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cartReducer) => cartReducer.isCartOpen
)

export const selectCartTotalPrice = createSelector(
  [selectCartProducts],
  (cartProducts) =>
    cartProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    )
)

export const selectCartCount = createSelector(
  [selectCartProducts],
  (cartProducts) =>
    cartProducts.reduce((total, product) => total + product.quantity, 0)
)
