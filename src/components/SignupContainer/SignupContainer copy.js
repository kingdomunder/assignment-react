import { useState } from 'react'
import { useNavigate } from 'react-router';
import { authSignup } from '../../api/AuthCommand';
import Button from '@mui/material/Button';

function SignupContainer() {

	const navigate = useNavigate();

	const [city, setCity] = useState("");
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [street, setStreet] = useState("");
	const [zipcode, setZipcode] = useState("");

	const handleSignup = () => {
		if (city.length > 0 && 
				email.length > 0  && 
				name.length > 0  && 
				password.length > 0  && 
				street.length > 0  && 
				zipcode.length > 0 ) {
					if (password.length >= 8 || password.length <= 10) {
						const data = {
							city,
							email,
							name,
							password,
							street,
							zipcode
						} 
					} else {
						alert("비밀번호는 8~10자리 입니다");
					}
		} else {
			alert("정보를 모두 입력해주세요");
		}
	};

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
			<Button variant="contained"  onClick={handleSignup}>SIGNUP</Button>
		</div>
	)
}

export default SignupContainer
