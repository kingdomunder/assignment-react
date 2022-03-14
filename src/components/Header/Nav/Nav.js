import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IS_LOGIN, ROUTE_PATH } from '../../../constants';
import LoginAlert from '../../Alert/LoginAlert';

function Nav() {
    const navigate = useNavigate();
    const url = useLocation();

    const [isLogin, setIsLogin] = useState(false);

    const checkLogin = () => {
        let result = false;
        const loginState = sessionStorage.getItem(IS_LOGIN);
        if (loginState) {
            result = true;
        } 

        return result
    };

    const logout = () => {
        sessionStorage.clear();
        setIsLogin(false);
        alert("로그아웃 완료");
        navToLogin();
        window.location.reload();
    };

    const navToLogin = () => {
        navigate(ROUTE_PATH.login);
    };

    const handleClickMember = () => {
        const result = checkLogin();
        if (result) {
            navigate(ROUTE_PATH.member);
        } else {
            LoginAlert();
            navigate(ROUTE_PATH.login);
        }
    };

    useEffect(() => {
        const loginState = sessionStorage.getItem(IS_LOGIN);
        if (loginState) {
            setIsLogin(true)
            if (url.pathname.slice(-5) === "login") { //로그인상태인데 로그인화면에 있으면 메인화면으로 이동
                navigate(ROUTE_PATH.main)
            };
        }; 
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
            <a onClick={handleClickMember}>Member</a>  &nbsp;
            <br />
            <br />
            <hr />
        </div>

    )
}

export default Nav