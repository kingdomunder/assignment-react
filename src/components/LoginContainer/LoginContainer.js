import { useState } from 'react'
import { useNavigate } from 'react-router';
import { authLogin } from '../../api/AuthQuery'
import { getMemberOne } from '../../api/MemberQuery';
import { ADMIN_AUTH, USER_AUTH } from '../../constants';
import { formCheckPassword } from '../Form';

function LoginContainer() {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async() => {
		if (!formCheckPassword()) {  //API호출하기 전에, 비밀번호 길이를 미리 검사
			const data = {
				
				email,
				password
			};
		}

		const result = await authLogin(navigate, data);
		if (result) {
			localStorage.setItem(USER_AUTH, email);
			const memberData = await getMemberOne(email);
			const auth = memberData.authority;
			if (auth === ADMIN_AUTH) {
				localStorage.setItem(ADMIN_AUTH, auth)
			};
		};

		} else {
			alert("입력정보를 확인해주세요") //비밀번호 길이 다름 (api호출 전 검사)
		};
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
			<button onClick={handleLogin}>LOGIN</button>
		</div>
	)
}

export default LoginContainer
