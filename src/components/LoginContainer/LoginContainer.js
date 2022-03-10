import { useState } from 'react'
import { auth_actions } from '../../_actions/auth_action'


function LoginContainer() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const requestLogin = () => {
        dispatch(auth_actions.login(email, password))
    }

    return (
        <div>
            <label>아이디</label>
                <input type="text" onChange={event => setEmail(event.target.value)} />
                <br/>
            <label>비밀번호</label>
                <input type="text" onChange={event => setPassword(event.target.value)} />
        </div>
    )
}

export default LoginContainer