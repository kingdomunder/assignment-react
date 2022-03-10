import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { ACCESS_TOKEN, ADMIN_AUTH, IS_LOGIN, ROUTE_PATH } from '../../../constants';

function Nav() {

    const navigate = useNavigate()

    const [isLogin, setIsLogin] = useState(false);
    
    const logout = () => {
        localStorage.clear(IS_LOGIN)
        localStorage.clear(ACCESS_TOKEN)
        localStorage.clear(ADMIN_AUTH)
        setIsLogin(false)
        window.location.reload()
    }

    useEffect(() => {
        let loginState = localStorage.getItem(IS_LOGIN)
        if (loginState === "null" || !loginState) {
            setIsLogin(false)
        } else {
            setIsLogin(true)
            if (window.location.href.slice(-5) === "login") {
                navigate(ROUTE_PATH.main)
            }
        }
      }, []);

    return (
        <div>
            <a onClick={() => navigate(ROUTE_PATH.main)}>Main</a> &nbsp;
            {isLogin ?
                <a onClick={logout}>Logout &nbsp;</a>
            :   
                <a onClick={() => navigate(ROUTE_PATH.login)}>Login &nbsp;</a>
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