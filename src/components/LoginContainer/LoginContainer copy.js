import { useState } from 'react';
import { authLogin } from '../../api/AuthQuery';
import { getMemberOne } from '../../api/MemberQuery';
import { ADMIN_AUTH, USER_AUTH } from '../../constants';
import { formCheckPassword } from '../Form';
import Button from '@mui/material/Button';

function LoginContainer() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async() => {
		if (!formCheckPassword(password)) {  //API호출하기 전에, 비밀번호 길이를 미리 검사
			alert("입력정보를 확인해주세요") 
		} else {
			const data = {
				email,
				password
			};
			const result = await authLogin(data);
			if (result) {
				sessionStorage.setItem(USER_AUTH, email);
				const memberData = await getMemberOne(email);
				const auth = memberData.authority;
				if (auth === ADMIN_AUTH) {
					sessionStorage.setItem(ADMIN_AUTH, auth)
				};
			};
		}
		window.location.reload();
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
			<Button variant="contained" onClick={handleLogin}>LOGIN</Button>
		</div>
	)
}

export default LoginContainer
