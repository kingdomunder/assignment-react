import { auth_actions } from "../_actions/auth_action"
import API from "./API"


export const logIn = ( email, password ) => {
    return dispatch
}

export const signUp = (city, email, name, password, street, zipcode) => {
    return dispatch => {
        console.log(city, email, name)
        API.post('api/auth/signup', {
            // city,
            // email,
            // name,
            // password,
            // street,
            // zipcode

            city: "서울",
            email: "king4525@naver.com",
            name: "임우송",
            password: "1234",
            street: "정자로",
            zipcode: "abcd"

        }).then(res => {
            console.log(res.data)
        }).catch(err => {
            alert("회원가입 실패")
        })
    }
}
