import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authLogin } from '../../api/AuthQuery';
import { getMemberOne } from '../../api/MemberQuery';
import { ADMIN_AUTH, USER_AUTH, ROUTE_PATH } from '../../constants';
import { formCheckPassword } from '../Form';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function LoginContainer() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();
	const theme = createTheme();

	const Copyright = (name) => {
		return (
			<Typography variant="body2" color="text.secondary" align="center" {...name}>
			{'Copyright © '}
			<Link color="inherit" href="https://www.twolinecode.com/">
			  {"TwoLineCode"}
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		  </Typography>
		);
	};

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
		<ThemeProvider theme={theme}>
		  <Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box
			  sx={{
				marginTop: 8,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			  }}
			>
			  <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
				<LockOutlinedIcon />
			  </Avatar>
			  <Typography component="h1" variant="h5">
				Log in
			  </Typography>
			  <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
				<TextField
				  margin="normal"
				  required
				  fullWidth
				  id="email"
				  label="Email Address"
				  name="email"
				  autoComplete="email"
				  autoFocus
				  onChange={e => setEmail(e.target.value)}
				/>
				<TextField
				  margin="normal"
				  required
				  fullWidth
				  name="password"
				  label="Password"
				  type="password"
				  id="password"
				  autoComplete="current-password"
				  onChange={e => setPassword(e.target.value)}
				/>
				<FormControlLabel
				  control={<Checkbox value="remember" color="primary" />}
				  label="Remember me"
				/>
				<Button
				  fullWidth
				  variant="contained"
				  sx={{ mt: 3, mb: 2 }}
				  onClick={handleLogin}
				>
				  Log In
				</Button>
				<Grid container>
				  <Grid item xs>
					<Link href="#" variant="body2">
					  Forgot password?
					</Link>
				  </Grid>
				  <Grid item>
					<Link href="#" variant="body2" onClick={() => navigate(ROUTE_PATH.signup)}>
					  {"Don't have an account? Sign Up"}
					</Link>
				  </Grid>
				</Grid>
			  </Box>
			</Box>
			<Copyright sx={{ mt: 8, mb: 4 }} />
		  </Container>
		</ThemeProvider>
	  );
}

export default LoginContainer
