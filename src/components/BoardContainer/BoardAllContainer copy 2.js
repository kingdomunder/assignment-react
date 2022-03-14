import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { BOARD_ALL, IS_LOGIN, ROUTE_PATH } from "../../constants";
import { getBoardAll, getBoardOne } from "../../api/BoardQuery";
import LoginAlert from "../Alert/LoginAlert";
import Pagination from "../Pagination/Pagination";
import BoardWriteButton from "../Button/BoardWriteButton";
import styles from "./BoardAllContainer.module.css"
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function BoardAllContainer() {
	const [boardData, setBoardData] = useState([]);
	const [boardTotalPage, setBoardTotalPage] = useState("");

	const navigate = useNavigate();
	const theme = createTheme();

	const handleBoardOne = async (seq) => {
		const result = await getBoardOne(seq);
		if (result) {
			navigate(ROUTE_PATH.boardOneView + seq);
		}
	};

	const handleBoardWrite = () => {
		const isLogin = sessionStorage.getItem(IS_LOGIN);
		if (isLogin === "null" || !isLogin) {
			LoginAlert();
		} else {
			navigate(ROUTE_PATH.boardWrite);
		}
	}

	const setBoardToStorage = (data) => {
		setBoardData(data);
		setBoardTotalPage(data.totalSize);
	};

	useEffect(async () => {
		const storageData = JSON.parse(sessionStorage.getItem(BOARD_ALL));
		if (storageData) {
			setBoardToStorage(storageData)
		};
		const getBoardData = await getBoardAll();
		if (getBoardData !== storageData) { // 업데이트 - 메인에서 불러온 게시판 정보와 새로 불러온 게시판 정보가 다르면, 새로운 게시판 정보로 갱신 
			setBoardToStorage(getBoardData);
		}
		if (!storageData && !getBoardData) {
			alert("등록된 글이 없습니다");
			navigate(ROUTE_PATH.main);
		}
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
						Board
					</Typography>
					<Box component="form" noValidate sx={{ mt: 3 }}>
						<table>
							{boardData &&
								boardData.length != 0 &&
								<div>
									<tr>
										<th>SEQ</th>
										<th>TITLE</th>
										<th>EMAIL</th>
										<th>VIEW</th>
									</tr>
									<hr />
									{boardData.list.map(board => (
										<tr key={board.seq} onClick={() => handleBoardOne(board.seq)}>
											<td>{board.seq}</td>
											<td>{board.title}</td>
											<td>{board.memberEmail}</td>
											<td>{board.viewCount}</td>
										</tr>
									))}
								</div>
							}
						</table>
						<BoardWriteButton />
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}

export default BoardAllContainer;
