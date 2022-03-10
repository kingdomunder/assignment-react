import { useState } from 'react'
import { useNavigate } from 'react-router';
import { authSignup } from '../../api/AuthCommand';

function SignupContainer() {

  const navigate = useNavigate()

  const [city, setCity] = useState("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [street, setStreet] = useState("")
  const [zipcode, setZipcode] = useState("")

  const handleSignup = () => {
    const data = {
      city,
      email,
      name,
      password,
      street,
      zipcode
    }
    authSignup(navigate, data)
  }

  return (
    <div> 
        <div>
          <label>CITY</label>
          <input type="text" 
                 value={city} 
                 onChange={e => setCity(e.target.value)} />
          <br />
          <label>EMAIL</label>
          <input type="text" 
                 value={email} 
                 onChange={e => setEmail(e.target.value)} />
          <br />
          <label>NAME</label>
          <input type="text" 
                 value={name} 
                 onChange={e => setName(e.target.value)} />
          <br />
          <label>PASSWORD</label>
          <input type="password" 
                 value={password} 
                 placeholder="8자 이상 10자 이하"
                 onChange={e => setPassword(e.target.value)} />
          <br />
          <label>STREET</label>
          <input type="text" 
                 value={street} 
                 onChange={e => setStreet(e.target.value)} />
          <br />
          <label>ZIPCODE</label>
          <input type="text" 
                 value={zipcode} 
                 onChange={e => setZipcode(e.target.value)} />
        </div>
        <button onClick={handleSignup}>SIGNUP</button>
    </div>
  )
}

export default SignupContainer