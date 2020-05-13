import {
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  AUTH_USER,
  ADD_TO_CART,
  GET_CART_ITEMS,
  REMOVE_CART_ITEMS,
  ON_SUCCESS_BUY,
} from "../actions/types"

const initialState = {
  loginSucess: "",
  register: "",
}
export default function (state = initialState, action) {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, register: action.payload }
    case LOGIN_USER:
      return { ...state, loginSucess: action.payload }
    case LOGOUT_USER:
      return { ...state }
    case AUTH_USER:
      return { ...state, userData: action.payload }
    case ADD_TO_CART:
      return {
        ...state,
        userData: {
          ...state.userData,
          cart: action.payload,
        },
      }
    case GET_CART_ITEMS:
      return { ...state, cartDetail: action.payload }
    case REMOVE_CART_ITEMS:
      return {
        ...state,
        cartDetail: action.payload.cartDetail,
        userData: {
          ...state.userData,
          cart: action.payload.cart,
        },
      }
    case ON_SUCCESS_BUY:
      return {
        ...state,
        successBuy: action.payload.success,
        userData: {
          ...state.userData,
          cart: action.payload.cart,
        },
        cartDetail: action.payload.cartDetail,
      }
    default:
      return state
  }
}
