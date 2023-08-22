import { CART_ACTION_TYPES } from "./cart.types"

const INITIAL_STATE = {
  isCartOpen: false,
  cartProducts: [],
}

export const cartReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS: {
      return {
        ...state,
        cartProducts: payload,
      }
    }

    case CART_ACTION_TYPES.TOGGLE_DROPDOWN: {
      return {
        ...state,
        isCartOpen: payload,
      }
    }

    default:
      return state
  }
}
