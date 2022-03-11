import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { ACCESS_TOKEN, ADMIN_AUTH, IS_LOGIN, NEED_LOGIN, ROUTE_PATH } from '../../../constants';

function Nav() {

    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(false);
    
    const logout = () => {
        localStorage.clear(IS_LOGIN)
        localStorage.clear(ACCESS_TOKEN)
        localStorage.clear(ADMIN_AUTH)
        setIsLogin(false)
        alert("로그아웃 완료")
        window.location.reload()
    };

    const navToLogin = () => {
        navigate(ROUTE_PATH.login)
    };

    useEffect(() => {
        const loginState = localStorage.getItem(IS_LOGIN)
        const needLogin = localStorage.getItem(NEED_LOGIN)
        if (loginState !== "null" && loginState) {
            setIsLogin(true)
            if (window.location.href.slice(-5) === "login") { //로그인상태인데 로그인화면에 있으면 메인화면으로 이동
                navigate(ROUTE_PATH.main)
            }
        } if (needLogin !== "null" && needLogin) {
            navToLogin();
            localStorage.clear(NEED_LOGIN);
        }
      }, []);

    return (
        <div>
            <a onClick={() => navigate(ROUTE_PATH.main)}>Main</a> &nbsp;
            {isLogin ?
                <a onClick={logout}>Logout &nbsp;</a>
            :   
                <a onClick={navToLogin}>Login &nbsp;</a>
            }
            <a onClick={() => navigate(ROUTE_PATH.signup)}>Signup</a>  &nbsp;
            <a onClick={() => navigate(ROUTE_PATH.boardAllView)}>Board</a>  &nbsp;
            <a onClick={() => navigate(ROUTE_PATH.member)}>Member</a>  &nbsp;
            <br />
            <br />
            <hr />
        </div>

    )
}

export default Nav