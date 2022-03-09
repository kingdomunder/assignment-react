import { ACCESS_TOKEN, PATH_NAME } from "../constants";
import API from "./API";

export const login = (navigate, loginData) => {
    API.post('api/auth/login', loginData)
    .then(res => {
        const userData = res.data // userData에는 백에서 발급받은 토큰이 들어있다고 가정 
        
        console.log(userData.status)
        userData.accessToken = 'token' 

        localStorage.setItem(ACCESS_TOKEN, userData.accessToken) 
        userData.accessToken
        ? navigate(PATH_NAME.main) 
        : alert("로그인 정보를 확인해주세요") && window.location.reload()
    })
    .catch(err => {
        alert(err.message)
        window.location.reload()
    })
}
