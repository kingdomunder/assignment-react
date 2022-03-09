import { useNavigate } from 'react-router';
import { ROUTE_PATH } from '../../../constants';

function Nav() {

    const navigate = useNavigate()
    
    return (
        <div>
            <a onClick={() => navigate(ROUTE_PATH.main)}>Main</a> <br />
            <a onClick={() => navigate(ROUTE_PATH.login)}>Login</a> <br />
            <a onClick={() => navigate(ROUTE_PATH.signup)}>Signup</a> <br />
            <a onClick={() => navigate(ROUTE_PATH.boardAll)}>Board</a> <br />
            <a>Member</a> <br />
            <hr />
        </div>

    )
}


export default Nav