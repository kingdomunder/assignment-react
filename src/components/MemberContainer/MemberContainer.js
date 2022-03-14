import { useEffect, useState } from 'react'
import { ADMIN_AUTH } from "../../constants"
import { getMemberOne, getMemberAll } from '../../api/MemberQuery'
import MemberOneContainer from './MemberSearchContainer/MemberOneContainer'
import { AdminModifyMember, AdminAuthMember, AdminDeleteMember } from '../../api/MemberCommand'
import styles from './MemberContainer.module.css'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function MemberContainer() {
	const [email, setEmail] = useState("");
	const [memberAll, setMemberAll] = useState("");
	const [memberOne, setMemberOne] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);
	const [newName, setNewName] = useState("");
	const [isModifying, setIsModifying] = useState(false);
	const [modifyingEmail, setModifyingEmail] = useState("");

	const theme = createTheme();

	const handleMemberAll = async () => {
		const data = await getMemberAll()
		setMemberAll(data);
		setMemberOne("");
		handleClear();
	};

	const handleMemberOne = async () => {
		const data = await getMemberOne(email);
		setMemberOne(data);
		setMemberAll("");
		handleClear();
	};

	const handleAdminModify = (memberEmail) => {
		if (memberEmail) {
			setIsModifying(true);
			setModifyingEmail(memberEmail);
		} else {
			handleClear();
		};
		setNewName("");
	};

	const handleAdminModifyConnfirm = async (memberEmail) => {
		const data = {
			"name": newName,
			"email": memberEmail
		}
		const result = await AdminModifyMember(data);
		if (result) {
			handleMemberAll();
		};
	};

	const handleAdminAuth = async (memberEmail) => {
		if (window.confirm("ADMIN 권한을 부여하시겠습니까?")) {
			const data = {
				"authority": ADMIN_AUTH,
				"email": memberEmail
			};
			const result = await AdminAuthMember(data)
			if (result) {
				handleMemberAll()
			};
		};
	};

	const handleAdminDelete = async (memberEmail) => {
		if (window.confirm("정말 삭제하시겠습니까?")) {
			const result = await AdminDeleteMember(memberEmail);
			if (result === '사용자가 없습니다.') {
				alert(result);
			} else {
				handleMemberAll();
			};
		};
	};

	const handleClear = () => {
		setIsModifying(false);
		setModifyingEmail("");
	};

	useEffect(async () => {
		const memberData = await getMemberAll();
		const adminAuth = sessionStorage.getItem(ADMIN_AUTH);
		if (memberData) {
			setMemberAll(memberData);
		};
		if (adminAuth === ADMIN_AUTH) {
			setIsAdmin(true)
		};

	}, []);

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
						Member
					</Typography>
					<Box component="form" noValidate sx={{ mt: 3, mb: 15 }}>
						{memberAll &&
							memberAll.length != 0 &&
							<Table size="small">
								<TableHead>
									<TableRow>
										<TableCell>SEQ</TableCell>
										<TableCell>TITLE</TableCell>
										<TableCell>EMAIL</TableCell>
										<TableCell>VIEW</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{memberAll.map(member => (
										<div>
											<TableRow key={member.seq}>
												<TableCell>{member.seq}</TableCell>
												<TableCell>{member.email}</TableCell>
												<TableCell>{member.name}</TableCell>
												<TableCell>{member.authority}</TableCell>
											</TableRow>
											<div>
												{isAdmin &&
													<div>
														{isModifying && modifyingEmail === member.email ?
															<div>
																<input type="text"
																	value={newName}
																	onChange={e => setNewName(e.target.value)} />
																<Button onClick={() => handleAdminModifyConnfirm(member.email)}>Confirm</Button>
																<Button onClick={() => handleAdminModify(false)}>취소</Button>
															</div>
															:
															<Button onClick={() => handleAdminModify(member.email)}>이름수정</Button>
														}
														<Button onClick={() => handleAdminAuth(member.email)}>Admin권한부여</Button>
														<Button onClick={() => handleAdminDelete(member.email)}>삭제</Button>
														<hr />
													</div>
												}
											</div>

										</div>
									))}
								</TableBody>
							</Table>
						}
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}

export default MemberContainer
