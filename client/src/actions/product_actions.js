import axios from 'axios';
import { PRODUCT_SERVER } from '../utils/misc';
import { GET_PRODUCTS_BY_SALE, GET_PRODUCTS_BY_ARRIVAL } from './types';



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