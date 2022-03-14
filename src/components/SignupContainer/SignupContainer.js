import { useState } from 'react'
import { useNavigate } from 'react-router';
import { authSignup } from '../../api/AuthCommand';
import { ROUTE_PATH } from '../../constants';
import { formCheckName, formCheckCity, formCheckEmail, formCheckPassword, formCheckPassword2, formCheckStreet, formCheckZipcode } from '../Form';
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

function SignupContainer() {
	const [name, setName] = useState("");
	const [city, setCity] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [street, setStreet] = useState("");
	const [zipcode, setZipcode] = useState("");
	
	const navigate = useNavigate();
	const theme = createTheme();

	const handleSignup = async() => {
		if (formCheckName(name) &&
		formCheckCity(city) &&
		formCheckEmail(email) &&
		formCheckPassword(password) &&
		formCheckPassword2(password, password2) &&
		formCheckStreet(street) &&
		formCheckZipcode(zipcode)) {
			const data = {
				city,
				email,
				name,
				password,
				street,
				zipcode
			};
			const result = await authSignup(data);
			if (result) {
				navigate(ROUTE_PATH.login);
			}
		} else {
			alert("입력정보를 확인해주세요");
		}
	};

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
				Sign up
			  </Typography>
			  <Box component="form" noValidate onSubmit={handleSignup} sx={{ mt: 3 }}>
				<Grid container spacing={2}>
				  <Grid item xs={12} sm={6}>
					<TextField
					  name="name"
					  required
					  fullWidth
					  id="name"
					  label="Name"
					  autoFocus
					  onChange={e => setName(e.target.value)}
					/>
				  </Grid>
				  <Grid item xs={12} sm={6}>
					<TextField
					  required
					  fullWidth
					  id="city"
					  label="City"
					  name="city"
					  onChange={e => setCity(e.target.value)}
					/>
				  </Grid>
				  <Grid item xs={12}>
					<TextField
					  required
					  fullWidth
					  id="email"
					  label="Email Address"
					  name="email"
					  onChange={e => setEmail(e.target.value)}
					/>
				  </Grid>
				  <Grid item xs={12}>
					<TextField
					  type="password"
					  required
					  fullWidth
					  name="password"
					  label="Password (8~10)"
					  id="password"
					  onChange={e => setPassword(e.target.value)}
					/>
				  </Grid>
				  <Grid item xs={12}>
					<TextField
					  type="password"
					  required
					  fullWidth
					  name="password2"
					  label="Password (repeat)"
					  id="password2"
					  onChange={e => setPassword2(e.target.value)}
					/>
				  </Grid>
				  <Grid item xs={12}>
					<TextField
					  required
					  fullWidth
					  name="street"
					  label="Street"
					  type="street"
					  id="street"
					  onChange={e => setStreet(e.target.value)}
					/>
				  </Grid>
				  <Grid item xs={12}>
					<TextField
					  required
					  fullWidth
					  name="zipcode"
					  label="Zipcode"
					  type="zipcode"
					  id="zipcode"
					  onChange={e => setZipcode(e.target.value)}
					/>
				  </Grid>
				  <Grid item xs={12}>
					<FormControlLabel
					  control={<Checkbox value="allowExtraEmails" color="primary" />}
					  label="I want to receive inspiration, marketing promotions and updates via email."
					/>
				  </Grid>
				</Grid>
				<Button
				  fullWidth
				  variant="contained"
				  sx={{ mt: 3, mb: 2 }}
				  onClick={handleSignup}
				>
				  Sign Up
				</Button>
				<Grid container justifyContent="flex-end">
				  <Grid item>
					<Link href="#" variant="body2" onClick={() => navigate(ROUTE_PATH.login)}>
					  Already have an account? - LogIn
					</Link>
				  </Grid>
				</Grid>
			  </Box>
			</Box>
		  </Container>
		</ThemeProvider>
	  );
}

export default SignupContainer
