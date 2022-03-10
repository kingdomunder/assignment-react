import { signUp } from '../api/Auth'
import { LOGIN, LOGOUT } from './type'
// import { SIGNUP } from "./type"

export const auth_actions = {
    login: () => ({ type: LOGIN }),
    logout: () => ({ type: LOGOUT }),
    // signUp: () => ({ type: SIGNUP }),
    signUp: signUp
}