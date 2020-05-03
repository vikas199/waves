import axios from "axios"
import { PRODUCT_SERVER } from "../utils/misc"
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
} from "./types"

export function getProductsByArrival() {
  const request = axios
    .get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4}`)
    .then((response) => response.data)
  return {
    type: GET_PRODUCTS_BY_ARRIVAL,
    payload: request,
  }
}

export function getProductsBySale() {
  const request = axios
    .get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4}`)
    .then((response) => response.data)
  return {
    type: GET_PRODUCTS_BY_SALE,
    payload: request,
  }
}

// CATEGORIES

export function getProductsByBrands() {
  const request = axios.get(`${PRODUCT_SERVER}/brands`).then((response) => response.data)
  return {
    type: GET_PRODUCTS_BY_BRANDS,
    payload: request,
  }
}

export function getProductsByWoods() {
  const request = axios.get(`${PRODUCT_SERVER}/woods`).then((response) => response.data)
  return {
    type: GET_PRODUCTS_BY_WOODS,
    payload: request,
  }
}

export function getProductsToShop(skip, limit, filters = [], previousState = []) {
  const data = {
    limit,
    skip,
    filters,
  }
  const request = axios.post(`${PRODUCT_SERVER}/shop`, data).then((response) => {
    let newState = [...previousState, ...response.data.articles]
    return {
      size: response.data.size,
      articles: newState,
    }
  })
  return {
    type: GET_PRODUCTS_TO_SHOP,
    payload: request,
  }
}
export function addProduct(dataToSubmit) {
  const request = axios.post(`${PRODUCT_SERVER}/article`, dataToSubmit).then((response) => response.data)
  return {
    type: ADD_PRODUCT,
    payload: request,
  }
}

export function clearProduct(){
return {
  type: CLEAR_PRODUCT
}
}

export function addBrand(dataToSubmit, exstingBrands){
 const request = axios.post(`${PRODUCT_SERVER}/brand`, dataToSubmit)
 .then(response => {
  let brands = [...exstingBrands, response.data.brand]
  return {
    success: response.data.success,
    brands
  }
 })
 return {
   type: ADD_BRAND,
   payload: request
 }
}

export function addWood(dataToSubmit, exstingWoods){
  const request = axios.post(`${PRODUCT_SERVER}/wood`, dataToSubmit)
  .then(response => {
   let woods = [...exstingWoods, response.data.wood]
   return {
     success: response.data.success,
     woods
   }
  })
  return {
    type: ADD_WOOD,
    payload: request
  }
 }