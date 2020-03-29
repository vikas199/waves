import { LOGIN_USER, LOGOUT_USER, REGISTER_USER, AUTH_USER } from '../actions/types'


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
            case LOGOUT_USER:
                return { ...state }
            case AUTH_USER:
                return { ...state, userData: action.payload }
        default: return state;
    }
}