import * as React from 'react';
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { ADMIN_AUTH, BOARD_ONE, ROUTE_PATH, USER_AUTH } from "../../../constants"
import { boardDelete, replyWrite, replyModify, replyDelete } from "../../../api/BoardCommand"
import { getBoardOne } from "../../../api/BoardQuery"
import ReplyContainer from "./ReplyContainer/ReplyContainer"
import styles from "./BoardOneContainer.module.css"
import BoardWriteButton from '../../Button/BoardWriteButton';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Orders from './ReplyContainer/ReplyContainer copy 2';

function BoardOneContainer({ boardSeq }) {

	const navigate = useNavigate();

	const [boardOne, setBoardOne] = useState("");
	const [replyContent, setReplyContent] = useState("");
	const [replyModifyContent, setReplyModifyContent] = useState("");
	const [isReplyModifying, setIsReplyModifying] = useState(false);
	const [isWriter, setIsWriter] = useState(false);
	const [userEmail, setUserEmail] = useState("");
	const [modifyingReply, setModifyingReply] = useState("");

	const theme = createTheme();

	const handleBoardDelete = async () => {
		if (window.confirm("정말 삭제하시겠습니까?")) {
			const result = await boardDelete(boardOne.seq);
			if (result) {
				alert("삭제 성공");
				navigate(ROUTE_PATH.boardAllView);
			};
		};
	};

	const handleReplyWrite = async () => {
		const replyData = {
			"boardSeq": boardOne.seq,
			"content": replyContent
		};
		const result = await replyWrite(replyData);
		if (result) {
			handleReload();
		};
	};

	const handleReplyModify = (reply) => {
		if (reply) {
			setReplyModifyContent(reply.content);
			setIsReplyModifying(true);
			setModifyingReply(reply.seq);
		} else {
			setIsReplyModifying(false);
			setModifyingReply("");
		};
	};

	const handleReplyModifyConfirm = async () => {
		const data = {
			"content": replyModifyContent,
			"seq": modifyingReply
		}
		const result = await replyModify(data);
		if (result) {
			handleReload();
		};
	};

	const handleReplyDelete = async (seq) => {
		if (window.confirm("정말 삭제하시겠습니까?")) {
			const result = await replyDelete(seq);
			if (result) {
				handleReload();
			};
		};
	};

	const handleReload = async () => {
		await getBoardOne(boardOne.seq);
		window.location.reload();
	};

	const preventDefault = (event) => {
		event.preventDefault();
	}

	useEffect(async () => {
		const boardOneData = await JSON.parse(sessionStorage.getItem(BOARD_ONE));
		const userEmailData = sessionStorage.getItem(USER_AUTH);
		setBoardOne(boardOneData);
		setUserEmail(userEmailData);
		if (boardOneData.memberEmail === userEmail) {
			setIsWriter(true);
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
						{boardOne.title}
					</Typography>
					<Box component="form" noValidate sx={{ mt: 3 }}>
						<div className={styles.boardContentContainer}>{boardOne.content}</div>
						<div>
							<div><h3>댓글</h3></div>
							<div>
								{boardOne.replies &&
									<div>
										<ReplyContainer replies={boardOne.replies} />
									</div>
								}
							</div>
						</div>
					</Box>
				</Box>
			</Container>

		</ThemeProvider>


	);
}

export default BoardOneContainer
