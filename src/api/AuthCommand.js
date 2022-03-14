import { ROUTE_PATH, API_PATH } from "../constants";
import API from "./API";

export const authSignup = async (signupData) => {
    let result = false;
    await API.post(API_PATH.signup, signupData)
    .then(res => {
        console.log(res.data);
        if (res.data === "") {
            alert("회원가입 성공");
            result = true;
        } else {
            alert("회원가입 실패");
        };
    })
    .catch(err => {
        console.log(err.message);
    })

    return result
}
