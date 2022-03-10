import { ACCESS_TOKEN, ROUTE_PATH, API_PATH, DATA } from "../constants";
import API from "./API";

export const authCheck = () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if(token) {
        API.post(API_PATH.check, token)
        .then(res => {
            console.log(res.data.status)
        })
        .catch(err => {
            alert(console.log(err.message))
        })
    } else {
        alert("인증 만료") 
    }
}

export const authLogin = (navigate, loginData) => {
    API.post(API_PATH.login, loginData)
    .then(res => {
        const result = res.data

        // 가입된 이메일이 없으면 null반환, 비밀번호가 틀리면 message반환
        if (result.data === null || result.data === DATA.pasErrorData) {
            alert("로그인 정보를 확인해주세요")
            window.location.reload()
        }
        else {
            localStorage.setItem(ACCESS_TOKEN, result.data.accessToken)
            navigate(ROUTE_PATH.main)
        }
    })
    .catch(err => {
        alert(err.message)
    })
}
