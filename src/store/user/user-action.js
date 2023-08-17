import { createAction } from "../../utils/reducer/reducer.utils"
import { USER_ACTIONS_TYPES } from "./user-types"

export const setUserAction = (user) =>
  createAction(USER_ACTIONS_TYPES.SET_CURRENT_USER, user)
