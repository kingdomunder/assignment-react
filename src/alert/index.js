import { NEED_LOGIN } from "../constants";

export const loginAlert = () => {
    alert("로그인이 필요합니다");
    localStorage.setItem(NEED_LOGIN, true);
    window.location.reload();
}