import { LOGIN_USER, REGISTER_USER } from '../actions/types'


const initialState = {
    loginSucess: '',
    register: ''
}
export default function(state = initialState, action){
    switch(action.type){
        case  REGISTER_USER:
            return { ...state, register: action.payload}
        case LOGIN_USER:
            return { ...state, loginSucess: action.payload}
        default: return state;
    }
}