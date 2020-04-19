import axios from 'axios';
import { PRODUCT_SERVER } from '../utils/misc';
import { GET_PRODUCTS_BY_SALE, GET_PRODUCTS_BY_ARRIVAL,  GET_PRODUCTS_BY_BRANDS,  GET_PRODUCTS_BY_WOODS, GET_PRODUCTS_TO_SHOP } from './types';



export function getProductsByArrival(){
    const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4}`)
    .then(response => response.data)
    return{
        type: GET_PRODUCTS_BY_ARRIVAL,
        payload: request
    }
}


export function getProductsBySale(){
    const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4}`)
    .then(response => response.data)
    return{
        type: GET_PRODUCTS_BY_SALE,
        payload: request
    }
}


// CATEGORIES 

export function getProductsByBrands(){
    const request = axios.get(`${PRODUCT_SERVER}/brands`)
    .then(response => response.data)
    return{
        type: GET_PRODUCTS_BY_BRANDS,
        payload: request
    }
}

export function getProductsByWoods(){
    const request = axios.get(`${PRODUCT_SERVER}/woods`)
    .then(response => response.data)
    return{
        type: GET_PRODUCTS_BY_WOODS,
        payload: request
    }
}

export function getProductsToShop(skip,limitValue,filters=[], previousState=[]){
     const limit = 6
const data = {
    skip,limit,filters
}
const request = axios.post(`${PRODUCT_SERVER}/shop`, data)
.then(response => {
    return {
        size: response.data.size,
        articles: response.data.articles
    }
})
return {
    type: GET_PRODUCTS_TO_SHOP,
    payload: request
}

}