import {
  GET_PRODUCTS_BY_SALE,
  GET_PRODUCTS_BY_ARRIVAL,
  GET_PRODUCTS_BY_BRANDS,
  GET_PRODUCTS_BY_WOODS,
  GET_PRODUCTS_TO_SHOP,
  ADD_PRODUCT,
  CLEAR_PRODUCT,
  ADD_BRAND,
  ADD_WOOD
} from "../actions/types"

const initialState = {
  bySale: "",
  byArrival: "",
  byBrands: "",
  byWoods: "",
  byFilter: "",
  toShop:"",
  toShopSize:'',
  addProduct: '',
  addNewBrand: '',
  addNewWoods: ''
}
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS_BY_SALE:
      return { ...state, bySale: action.payload }
    case GET_PRODUCTS_BY_ARRIVAL:
      return { ...state, byArrival: action.payload }
    case GET_PRODUCTS_BY_BRANDS:
      return { ...state, byBrands: action.payload }
      case ADD_BRAND:
            return {
                ...state, 
                addNewBrand: action.payload.success , 
                byBrands:action.payload.brands 
            }
            case ADD_WOOD:
              return {
                  ...state, 
                  addNewWoods: action.payload.success , 
                  byWoods:action.payload.woods 
              }
    case GET_PRODUCTS_BY_WOODS:
      return { ...state, byWoods: action.payload }
    case GET_PRODUCTS_TO_SHOP:
      return { ...state, toShop: action.payload.articles, toShopSize: action.payload.size }
      case ADD_PRODUCT: 
      return { ...state, addProduct: action.payload}
      case CLEAR_PRODUCT:
        return {...state, addProduct:''}
    default:
      return state
  }
}
