import { ACCESS_TOKEN, ADMIN_AUTH, IS_LOGIN, API_PATH, DATA } from "../constants";
import API from "./API";

export const authCheck = async() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if(token) {
        await API.post(API_PATH.check, token)
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            alert(console.log(err.message))
        })
    } else {
        alert("인증 만료") 
    }
}

export const authLogin = async(navigate, loginData) => {
    let result = false
    await API.post(API_PATH.login, loginData)
    .then(res => {

        // 가입된 이메일이 없으면 null반환, 비밀번호가 틀리면 message반환
        if (res.data.data === null || res.data.data === DATA.pasErrorData) {
            alert("로그인 정보를 확인해주세요")
            window.location.reload()
        }
        else {
            localStorage.setItem(ACCESS_TOKEN, res.data.data.accessToken)
            localStorage.setItem(IS_LOGIN, true)
            result = true         
        }
    })
    .catch(err => {
        alert(err.message)
    })
    return result
}
