import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../constants";


function LoginAlert(path) {
    alert("로그인이 필요합니다");
    const navigate = useNavigate();
    if (path) {
        navigate(path);
    }
}

export default LoginAlert