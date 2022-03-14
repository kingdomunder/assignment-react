import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../constants";

function LoginAlert() {
    const navigate = useNavigate();
    
    alert("로그인이 필요합니다");
    navigate(ROUTE_PATH.login);
}

export default LoginAlert