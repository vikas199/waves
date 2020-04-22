import {
  GET_PRODUCTS_BY_SALE,
  GET_PRODUCTS_BY_ARRIVAL,
  GET_PRODUCTS_BY_BRANDS,
  GET_PRODUCTS_BY_WOODS,
  GET_PRODUCTS_TO_SHOP,
} from "../actions/types"

const initialState = {
  bySale: "",
  byArrival: "",
  byBrands: "",
  byWoods: "",
  byFilter: "",
  toShop:"",
  toShopSize:''
}
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS_BY_SALE:
      return { ...state, bySale: action.payload }
    case GET_PRODUCTS_BY_ARRIVAL:
      return { ...state, byArrival: action.payload }
    case GET_PRODUCTS_BY_BRANDS:
      return { ...state, byBrands: action.payload }
    case GET_PRODUCTS_BY_WOODS:
      return { ...state, byWoods: action.payload }
    case GET_PRODUCTS_TO_SHOP:
      return { ...state, toShop: action.payload.articles, toShopSize: action.payload.size }
    default:
      return state
  }
}
