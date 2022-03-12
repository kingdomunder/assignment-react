import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ACCESS_TOKEN, ADMIN_AUTH, USER_AUTH, IS_LOGIN, NEED_LOGIN, ROUTE_PATH, BOARD_ALL } from '../../../constants';
import { getBoardAll } from '../../../api/BoardQuery';
import LoginAlert from '../../Alert/LoginAlert';
import Form from '../../Form';

function Nav() {

    const navigate = useNavigate();
    const url = useLocation();

    const [isLogin, setIsLogin] = useState(false);

    const checkLogin = () => {
        let result = false;
        const loginState = localStorage.getItem(IS_LOGIN);
        if (loginState) {
            result = true;
        } 

        return result
    };

    const logout = () => {
        localStorage.clear();
        setIsLogin(false);
        alert("로그아웃 완료");
        navToLogin();
        window.location.reload();
    };

    const navToLogin = () => {
        navigate(ROUTE_PATH.login);
    };

    const refreshBoard = () => {
        getBoardAll(5);
    };

    const handleClickMember = () => {
        const result = checkLogin();
        if (result) {
            navigate(ROUTE_PATH.member);
        } else {
            LoginAlert();
        }
    };

    useEffect(() => {
        console.log(Form.password);


        const loginState = localStorage.getItem(IS_LOGIN);
        if (url.pathname.slice(0,6) !== "/board") { //현재 경로가 board관련이 아닐때, reload될때마다 게시글 요청해서 보관
            refreshBoard();
        };
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