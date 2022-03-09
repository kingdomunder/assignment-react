import { TOKEN, ROUTE_PATH, API_PATH } from "../constants";
import API from "./API";

export const authCheck = () => {
    const token = localStorage.getItem(TOKEN);
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
        const userData = res.data //로그인 성공하면 백에서 토큰 발급받는다고 가정 
        
        console.log(userData.status)
        userData.token = 'tokenString' 

        localStorage.setItem(TOKEN, userData.token) 
        userData.token
        ? navigate(ROUTE_PATH.main) 
        : alert("로그인 정보를 확인해주세요") && window.location.reload()
    })
    .catch(err => {
        console.log(err.message)
        window.location.reload()
    })
}
