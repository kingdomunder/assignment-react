import { useNavigate } from 'react-router';
import { PATH_NAME } from '../../../constants';

function Nav() {

    const navigate = useNavigate()
    
    return (
        <div>
            <a onClick={() => navigate(PATH_NAME.main)}>Main</a> <br />
            <a onClick={() => navigate(PATH_NAME.login)}>Login</a> <br />
            <a>Board</a> <br />
            <a>Member</a> <br />
        </div>

    )
}


export default Nav