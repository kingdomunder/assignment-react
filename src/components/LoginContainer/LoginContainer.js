import { useState } from 'react'
import { useNavigate } from 'react-router';
import { authLogin } from '../../api/AuthQuery'

function LoginContainer() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    if (password.length >= 8 && password.length <= 10) {
      authLogin(navigate, {
        email,
        password
      })
    } else {
      alert("입력정보를 확인해주세요")
    }
  }

  return (
    <div> 
        <div>
          <label>EMAIL</label>
          <input type="text" 
                 value={email} 
                 onChange={e => setEmail(e.target.value)} />
          <br />
          <label>PASSWORD</label>
          <input type="password" 
                 value={password} 
                 placeholder="8자 이상 10자 이하"
                 onChange={e => setPassword(e.target.value)} />
        </div>
        <button onClick={handleLogin}>LOGIN</button>
    </div>
  )
}

export default LoginContainer
