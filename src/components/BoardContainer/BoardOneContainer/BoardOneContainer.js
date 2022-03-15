import * as React from 'react';
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { ADMIN_AUTH, BOARD_ONE, ROUTE_PATH, USER_AUTH } from "../../../constants"
import { boardDelete, replyWrite, replyModify, replyDelete } from "../../../api/BoardCommand"
import { getBoardOne } from "../../../api/BoardQuery"
import ReplyContainer from "./ReplyContainer/ReplyContainer"
import styles from "./BoardOneContainer.module.css"
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function BoardOneContainer({ boardSeq }) {
	const [boardOne, setBoardOne] = useState("");
	const [repliesLength, setRepliesLength] = useState(0);
	const [replyContent, setReplyContent] = useState("");
	const [isWriter, setIsWriter] = useState(false);
	const [userEmail, setUserEmail] = useState(111);
	
	const navigate = useNavigate();
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

	const handleReload = async () => {
		await getBoardOne(boardOne.seq);
		window.location.reload();
	};

	useEffect(async () => {
		const boardOneData = await JSON.parse(sessionStorage.getItem(BOARD_ONE));
		const userEmailData = sessionStorage.getItem(USER_AUTH);
		setBoardOne(boardOneData);
		setUserEmail(userEmailData);
		if (boardOneData.replies) {
			setRepliesLength(boardOneData.replies.length);
		};
		if (boardOneData.memberEmail === userEmail) {
			setIsWriter(true);
		};
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="md">
				<CssBaseline />
				<Box
					className={styles.boardOneBox}
				>
					<div className={styles.boardTitleContainer}>
						<Typography component="h1" variant="h5" sx={{ mb: 3 }}>
							{boardOne.title}
						</Typography>
						<div className={styles.boardTitleSubContainer}>
							<div>
								<div>작성자 : <span className={styles.spanEmail}>{boardOne.memberEmail}</span></div>
								<div>마지막 작성일 : <span className={styles.spanDate}>{boardOne.updateDate}</span></div>
							</div>
							<div className={styles.subRight}>
								<div>조회수 : {boardOne.viewCount}</div>
								<div>댓글 : {repliesLength}</div>
							</div>
						</div>
					</div>
					<div style={{ width: "100%" }}><hr /></div>
					<div className={styles.boardContentContainer}>{boardOne.content}</div>
					<hr />
					<div>
						{isWriter &&
							<div className={styles.buttonContainer}>
								<Button
									fullWidth
									variant="contained"
									sx={{ mt: 2, mb: 2 }}
									onClick={() => navigate(ROUTE_PATH.BoardModify + boardOne.seq)}
								>
									Modify
								</Button>
								<Button
									fullWidth
									variant="contained"
									sx={{ mt: 2, mb: 2 }}
									color="warning"
									onClick={() => handleBoardDelete(boardOne.seq)}
								>
									Delete
								</Button>
							</div>
						}
					</div>
					<div className={styles.replyBox}>
						<hr />
						<h3>댓글 {repliesLength}</h3>
						<div>
							{boardOne.replies &&
								<div>
									<ReplyContainer 
									replies={boardOne.replies} 
									userEmail={sessionStorage.getItem(USER_AUTH)} 
									isAdmin = {sessionStorage.getItem(ADMIN_AUTH)}/>
								</div>
							}
							<div className={styles.replyWriteBox}>
								<textarea className={styles.textarea}
									onChange={e => setReplyContent(e.target.value)}
									rows="5"
									cols="100"
									maxLength="500"
									spellCheck="false"
									value={replyContent} />
							</div>
							<button onClick={handleReplyWrite}>댓글달기</button>
						</div>
					</div>
					
				</Box>
			</Container>

		</ThemeProvider>


	);
}

export default BoardOneContainer
