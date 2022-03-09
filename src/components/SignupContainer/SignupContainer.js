import useState from 'react'
import { login } from '../../api/Auth_query'

function LoginContainer() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    console.log(email, password)
    alert(email + "===" + password)
    login(email, password)
  }

  return (
    <div> 
        <label>이메일</label>
        <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
        <label>비밀번호</label>
        <input type="text" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={handleLogin}>로그인</button>
    </div>
  )
}

export default LoginContainer
