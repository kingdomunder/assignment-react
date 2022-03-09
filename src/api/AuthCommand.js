import { ROUTE_PATH, API_PATH } from "../constants";
import API from "./API";

export const authSignup = (navigate, signupData) => {
    API.post(API_PATH.signup, signupData)
    .then(res => {
        console.log(res.data)
        const status = res.data.status
        if (status === 200) {
            alert("회원가입 성공")
            navigate(ROUTE_PATH.login)
        } else {
            alert("회원가입 실패")
        }
    })
    .catch(err => {
        console.log(err.message)
    })
}
