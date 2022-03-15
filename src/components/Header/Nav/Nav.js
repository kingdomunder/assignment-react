import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IS_LOGIN, ROUTE_PATH } from '../../../constants';
import LoginAlert from '../../Alert/LoginAlert';
import styles from './Nav.module.css'
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AppBar from './AppBar';
import Toolbar from './ToolBar';

function Nav() {
	const navigate = useNavigate();
	const url = useLocation();

	const [isLogin, setIsLogin] = useState(false);

	const checkLogin = () => {
		let result = false;
		const loginState = sessionStorage.getItem(IS_LOGIN);
		if (loginState) {
			result = true;
		}

		return result
	};

	const logout = () => {
		sessionStorage.clear();
		setIsLogin(false);
		alert("로그아웃 완료");
		navToLogin();
		window.location.reload();
	};

	const navToLogin = () => {
		navigate(ROUTE_PATH.login);
	};

	const handleClickMember = () => {
		const result = checkLogin();
		if (result) {
			navigate(ROUTE_PATH.member);
		} else {
			LoginAlert();
		}
	};

	const rightLink = {
		fontSize: 16,
		color: 'common.white',
		ml: 3,
	};

	useEffect(() => {
		const loginState = sessionStorage.getItem(IS_LOGIN);
		if (loginState) {
			setIsLogin(true)
			if (url.pathname.slice(-5) === "login") { //로그인상태인데 로그인화면에 있으면 메인화면으로 이동
				navigate(ROUTE_PATH.main)
			};
		};
	}, []);

	return (
		<div>
			<AppBar position="fixed">
				<Toolbar sx={{ justifyContent: 'space-between' }}>
					<Box sx={{ flex: 1 }} />
					<Link
						variant="h6"
						underline="none"
						color="inherit"
						sx={{ fontSize: 24 }}
					>
						{'TEST'}
					</Link>
					<Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
						<Link
							color="inherit"
							variant="h6"
							underline="none"
							sx={rightLink}
							onClick={() => navigate(ROUTE_PATH.main)}
						>
							{'Main'}
						</Link>
						{isLogin ?
							<Link
								variant="h6"
								underline="none"
								sx={{ ...rightLink, color: 'secondary.main' }}
								onClick={logout}
							>
								{'LogOut'}
							</Link>
							:
							<Link
								variant="h6"
								underline="none"
								sx={{ ...rightLink, color: 'secondary.main' }}
								onClick={navToLogin}
							>
								{'LogIn'}
							</Link>
						}
						{!isLogin &&
							<Link
								variant="h6"
								underline="none"
								sx={{ ...rightLink, color: 'secondary.main' }}
								onClick={() => navigate(ROUTE_PATH.signup)}
							>
								{'SignUp'}
							</Link>
						}
						<Link
							variant="h6"
							underline="none"
							sx={{ ...rightLink, color: 'secondary.main' }}
							onClick={() => navigate(ROUTE_PATH.boardAllView)}
						>
							{'Board'}
						</Link>
						<Link
							variant="h6"
							underline="none"
							sx={{ ...rightLink, color: 'secondary.main' }}
							onClick={handleClickMember}
						>
							{'Member'}
						</Link>
					</Box>
				</Toolbar>
			</AppBar>
			<Toolbar />
		</div>
	);
}

export default Nav